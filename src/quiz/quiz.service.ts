import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';

@Injectable()
export class QuizService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createQuizDto: CreateQuizDto) {
    const { questionIds, results, subjectId, groupId } = createQuizDto;
    try {
      const createdAt = new Date();
      createdAt.setHours(createdAt.getHours() + 4);
      const quiz = await this.prisma.quiz.create({
        data: {
          subject: { connect: { id: subjectId } },
          group: { connect: { id: groupId } },
          Questions: { connect: questionIds?.map((id) => ({ id })) },
          Result: { connect: results?.map((id) => ({ id })) },
          createdAt: createdAt,
        },
      });
      return 'Quiz created successfully';
    } catch (error) {
      throw error;
    }
  }

  findAll() {
    try {
      return this.prisma.quiz.findMany();
    } catch (error) {
      throw error;
    }
  }

  findOne(id: number) {
    try {
      return this.prisma.quiz.findUnique({
        where: {
          id,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  update(id: number, updateQuizDto: UpdateQuizDto) {
    try {
      return this.prisma.quiz.update({
        where: {
          id,
        },
        data: updateQuizDto,
      });
    } catch (error) {
      throw error;
    }
  }

  remove(id: number) {
    return this.prisma.quiz.delete({
      where: {
        id,
      },
    });
  }
}
