import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import contentExtractor from './helper/contentExtractor';

@Injectable()
export class QuestionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createQuestionDto: CreateQuestionDto) {
    try {
      const { subjectId, groupId, ...rest } = createQuestionDto;
      const question = await this.prisma.question.create({
        data: createQuestionDto,
        select: {
          id: true,
          question: true,
          filename: true,
          subjectId: true,
          groupId: true,
          Options: true,
          createdAt: true,
        },
      });
      //change createdAt timezone to GMT +4
      const newCreatedAt = (question.createdAt = new Date(
        question.createdAt.getTime() + 1000 * 60 * 60 * 4,
      ));
      return question;
    } catch (error) {
      throw error;
    }
  }

  findAll() {
    return this.prisma.question.findMany({
      select: {
        id: true,
        question: true,
        filename: true,
        subjectId: true,
        groupId: true,
        Options: true,
      },
    });
  }
  findOne(id: number) {
    return this.prisma.question.findUnique({
      where: {
        id,
      },
    });
  }
  update(id: number, updateQuestionDto: UpdateQuestionDto) {
    return this.prisma.question.update({
      where: {
        id,
      },
      data: updateQuestionDto,
    });
  }
  remove(id: number) {
    return this.prisma.question.delete({
      where: {
        id,
      },
    });
  }

  async uploadFile(
    file: Express.Multer.File,
    subjectId: number,
    groupId: number,
  ) {
    try {
      contentExtractor(file)
        .then(async (lines: string[]) => {
          console.log(lines);
          const question = lines[0];
          await this.prisma.question.create({
            data: {
              question: question,
              filename: file.originalname,
              url: file.path,
              subjectId: subjectId,
              groupId: groupId,
            },
            select: {
              id: true,
              question: true,
              filename: true,
              subjectId: true,
              groupId: true,
              Options: true,
            },
          });
          const latestQuestion = await this.prisma.question.findFirst({
            orderBy: {
              id: 'desc',
            },
            select: {
              id: true,
            },
          });
          const questionId = latestQuestion.id;
          const lastLine = lines[lines.length - 1];

          for (let i = 1; i < lines.length - 1; i++) {
            if (lines[i] == '') {
              continue;
            }
            if (lines[i].includes(lastLine)) {
              await this.prisma.option.create({
                data: {
                  option: lines[i],
                  is_correct: true,
                  questionId: questionId,
                },
              });
              continue;
            }
            await this.prisma.option.create({
              data: {
                option: lines[i],
                is_correct: false,
                questionId: questionId,
              },
            });
          }
        })
        .catch((err: Error) => {
          console.log(err);
        });
      return {
        message: 'File uploaded successfully',
        subjectId,
        groupId,
      };
    } catch (error) {
      throw error;
    }
  }
}
