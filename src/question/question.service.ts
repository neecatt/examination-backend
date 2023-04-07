import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import contentExtractor from './helper/contentExtractor';
import { Question } from '@prisma/client';

@Injectable()
export class QuestionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createQuestionDto: CreateQuestionDto): Promise<Question> {
    try {
      const { subjectId, groupId, ...rest } = createQuestionDto;
      const createdAt = new Date();
      createdAt.setHours(createdAt.getHours() + 4);
      const question = await this.prisma.question.create({
        data: {
          createdAt,
          ...createQuestionDto,
        },
        include: {
          Options: true,
        },
      });
      return question;
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<Question[]> {
    return await this.prisma.question.findMany({
      include: {
        Options: true,
      },
    });
  }
  async findOne(id: number): Promise<Question> {
    const question = await this.prisma.question.findUnique({
      where: {
        id,
      },
    });
    if (!question) {
      throw new NotFoundException('Question not found');
    }
    return question;
  }
  async update(
    id: number,
    updateQuestionDto: UpdateQuestionDto,
  ): Promise<Question> {
    return await this.prisma.question.update({
      where: {
        id,
      },
      data: updateQuestionDto,
    });
  }
  async remove(id: number): Promise<{ message: string }> {
    try {
      await this.prisma.question.delete({
        where: {
          id,
        },
      });
      return { message: 'Question deleted successfully' };
    } catch (error) {
      throw error;
    }
  }

  async uploadFile(
    file: Express.Multer.File,
    subjectId: number,
    groupId: number,
  ): Promise<{ message: string; subjectId: number; groupId: number }> {
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
        include: {
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
