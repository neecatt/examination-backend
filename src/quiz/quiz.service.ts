import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { FindQuizDto } from './dto/find-quiz.dto';
import { Quiz } from '@prisma/client';

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
          createdAt,
        },
        include: {
          subject: true,
          group: true,
          Questions: {
            include: {
              Options: true,
            },
          },
        },
      });
      return quiz;
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<Quiz[]> {
    try {
      return await this.prisma.quiz.findMany();
    } catch (error) {
      throw error;
    }
  }

  async findbySubjectandGroup(findQuizDto: FindQuizDto): Promise<Quiz> {
    const quiz = await this.prisma.quiz.findUnique({
      where: {
        subjectId_groupId: {
          subjectId: findQuizDto.subjectId,
          groupId: findQuizDto.groupId,
        },
      },
      include: {
        Questions: {
          include: {
            Options: true,
          },
        },
        Result: true,
      },
    });

    if (!quiz) throw new NotFoundException('Quiz not found');
    return quiz;
  }

  async findOne(id: number): Promise<Quiz> {
    const quiz = await this.prisma.quiz.findUnique({
      where: {
        id,
      },
      include: {
        Questions: {
          include: {
            Options: true,
          },
        },
        Result: true,
      },
    });

    if (!quiz) throw new NotFoundException('Quiz not found');

    return quiz;
  }

  async update(id: number, updateQuizDto: UpdateQuizDto): Promise<Quiz> {
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

  async remove(id: number): Promise<Quiz> {
    try {
      return await this.prisma.quiz.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
