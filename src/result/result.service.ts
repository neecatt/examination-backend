import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateResultDto } from './dto/create-result.dto';
import { UpdateResultDto } from './dto/update-result.dto';
import { Result } from '@prisma/client';

@Injectable()
export class ResultService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createResultDto: CreateResultDto): Promise<Result> {
    try {
      const { quizId, ...resultData } = createResultDto;
      const createdAt = new Date();
      createdAt.setHours(createdAt.getHours() + 4);
      return await this.prisma.result.create({
        data: {
          quiz: { connect: { id: quizId } },
          createdAt: createdAt,
          ...resultData,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<Result[]> {
    try {
      return await this.prisma.result.findMany();
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number): Promise<Result> {
    const result = await this.prisma.result.findUnique({
      where: {
        id,
      },
    });
    if (!result) {
      throw new NotFoundException('Result not found');
    }
    return result;
  }

  async update(id: number, updateResultDto: UpdateResultDto): Promise<Result> {
    try {
      return await this.prisma.result.update({
        where: {
          id,
        },
        data: updateResultDto,
      });
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number): Promise<Result> {
    try {
      return await this.prisma.result.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
