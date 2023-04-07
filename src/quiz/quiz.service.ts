import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { FindQuizDto } from './dto/find-quiz.dto';

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
        select: {
          id: true,
          subject: {
            select: {
              id: true,
              name: true,
            },
          },
          group: {
            select: {
              id: true,
              name: true,
            },
          },
          Questions: {
            select: {
              id: true,
              question: true,
              Options: {
                select: {
                  id: true,
                  option: true,
                },
              },
            },
          },
        },
      });
      return quiz;
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

  async findbySubjectandGroup(findQuizDto: FindQuizDto) {
    const quiz = await this.prisma.quiz.findUnique({
      where: {
        subjectId_groupId: {
          subjectId: findQuizDto.subjectId,
          groupId: findQuizDto.groupId,
        },
      },
      select: {
        id: true,
        Questions: {
          select: {
            id: true,
            question: true,
            Options: {
              select: {
                id: true,
                option: true,
                is_correct: true,
              },
            },
          },
        },
        Result: {
          select: {
            id: true,
            scoreAchieved: true,
            scoreTotal: true,
          },
        },
      },
    });

    if (!quiz) throw new NotFoundException('Quiz not found');
    return quiz;
  }

  async findOne(id: number) {
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
