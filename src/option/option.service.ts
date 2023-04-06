import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateOptionDto } from './dto/create-option.dto';
import { UpdateOptionDto } from './dto/update-option.dto';

@Injectable()
export class OptionService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createOptionDto: CreateOptionDto) {
    return await this.prisma.option.create({
      data: createOptionDto,
    });
  }

  async findAll() {
    return await this.prisma.option.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.option.findFirst({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateOptionDto: UpdateOptionDto) {
    return await this.prisma.option.update({
      where: {
        id,
      },
      data: updateOptionDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.option.delete({
      where: {
        id,
      },
    });
  }
}
