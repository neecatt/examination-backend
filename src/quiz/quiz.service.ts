import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { FindQuizDto } from './dto/find-quiz.dto';
import { Quiz } from '@prisma/client';

/**
 *
 
 *
 * @export
 * @class QuizService
 * @typedef {QuizService}
 */
@Injectable()
export class QuizService {
  /**
   * Creates an instance of QuizService.
   
   *
   * @constructor
   * @param {PrismaService} prisma
   */
  constructor(private readonly prisma: PrismaService) {}
  /**
   *
   *
   * @async
   * @param {CreateQuizDto} createQuizDto
   * @returns {Promise<Quiz>}
   */
  async create(createQuizDto: CreateQuizDto): Promise<Quiz> {
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

  /**
   *
   
   *
   * @async
   * @returns {Promise<Quiz[]>}
   */
  async findAll(): Promise<Quiz[]> {
    try {
      return await this.prisma.quiz.findMany({
        include: {
          Questions: true,
          Result: true,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   *
   
   *
   * @async
   * @param {FindQuizDto} findQuizDto
   * @returns {Promise<Quiz>}
   */
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

  /**
   *
   
   *
   * @async
   * @param {number} id
   * @returns {Promise<Quiz>}
   */
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

  /**
   *
   
   *
   * @async
   * @param {number} id
   * @param {UpdateQuizDto} updateQuizDto
   * @returns {Promise<Quiz>}
   */
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

  /**
   *
   
   *
   * @async
   * @param {number} id
   * @returns {Promise<Quiz>}
   */
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
