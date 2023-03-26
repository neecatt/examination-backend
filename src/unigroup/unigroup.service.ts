import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUnigroupDto } from './dto/create-unigroup.dto';
import { UpdateUnigroupDto } from './dto/update-unigroup.dto';

@Injectable()
export class UnigroupService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createUnigroupDto: CreateUnigroupDto) {
    try {
      return await this.prisma.uniGroup.create({
        data: {
          ...createUnigroupDto,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      return await this.prisma.uniGroup.findMany();
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      const unigroup = await this.prisma.uniGroup.findUnique({
        where: {
          id,
        },
      });
      if (!unigroup) {
        throw new Error(`Unigroup with id ${id} not found`);
      }
      return unigroup;
    } catch (error) {}
  }

  async update(id: number, updateUnigroupDto: UpdateUnigroupDto) {
    try {
      return await this.prisma.uniGroup.update({
        where: {
          id,
        },
        data: {
          ...updateUnigroupDto,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.uniGroup.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
