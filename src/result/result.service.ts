import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateResultDto } from './dto/create-result.dto';
import { UpdateResultDto } from './dto/update-result.dto';

@Injectable()
export class ResultService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createResultDto: CreateResultDto) {
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

  async findAll() {
    try {
      await this.prisma.result.findMany();
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      return await this.prisma.result.findUnique({
        where: {
          id,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateResultDto: UpdateResultDto) {
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

  async remove(id: number) {
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
