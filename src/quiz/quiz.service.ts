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

  async findAll() {
    try {
      return await this.prisma.quiz.findMany();
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      return await this.prisma.quiz.findUnique({
        where: {
          id,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateQuizDto: UpdateQuizDto) {
    try {
      return await this.prisma.quiz.update({
        where: {
          id,
        },
        data: updateQuizDto,
      });
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    return await this.prisma.quiz.delete({
      where: {
        id,
      },
    });
  }
}
