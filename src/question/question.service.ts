import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

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
          fileurl: true,
          subjectId: true,
          groupId: true,
          Option: true,
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
    return this.prisma.question.findMany();
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
}
