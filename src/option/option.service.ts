import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateOptionDto } from './dto/create-option.dto';
import { UpdateOptionDto } from './dto/update-option.dto';
import { Option } from '@prisma/client';

@Injectable()
export class OptionService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createOptionDto: CreateOptionDto): Promise<Option> {
    try {
      return await this.prisma.option.create({
        data: createOptionDto,
      });
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<Option[]> {
    const options = await this.prisma.option.findMany();
    if (!options) {
      throw new NotFoundException('No options found');
    }
    return options;
  }

  async findOne(id: number): Promise<Option> {
    const option = await this.prisma.option.findFirst({
      where: {
        id,
      },
    });
    if (!option) {
      throw new NotFoundException('Option not found');
    }
    return option;
  }

  async update(id: number, updateOptionDto: UpdateOptionDto): Promise<Option> {
    return await this.prisma.option.update({
      where: {
        id,
      },
      data: updateOptionDto,
    });
  }

  async remove(id: number): Promise<Option> {
    try {
      return await this.prisma.option.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
