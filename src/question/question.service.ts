import { BadRequestException, Injectable } from '@nestjs/common';
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
      const createdAt = new Date();
      createdAt.setHours(createdAt.getHours() + 4);
      const question = await this.prisma.question.create({
        data: {
          createdAt: createdAt,
          ...createQuestionDto,
        },
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
      return question;
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    return await this.prisma.question.findMany({
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
  async findOne(id: number) {
    return await this.prisma.question.findUnique({
      where: {
        id,
      },
    });
  }
  async update(id: number, updateQuestionDto: UpdateQuestionDto) {
    return await this.prisma.question.update({
      where: {
        id,
      },
      data: updateQuestionDto,
    });
  }
  async remove(id: number) {
    const removeQuestion = await this.prisma.question.delete({
      where: {
        id,
      },
    });
    return 'Question deleted successfully';
  }

  async uploadFile(
    file: Express.Multer.File,
    subjectId: number,
    groupId: number,
  ) {
    try {
      const lines = await new Promise<string[]>((resolve, reject) => {
        contentExtractor(file)
          .then((lines: string[]) => {
            resolve(lines);
          })
          .catch((err: Error) => {
            console.log(err);
            reject(err);
          });
      });
      const question = lines[0];
      if (lines.length > 10 || lines.length < 3) {
        throw new BadRequestException('Too many options');
      }
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
