import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateOptionDto } from './dto/create-option.dto';
import { UpdateOptionDto } from './dto/update-option.dto';

@Injectable()
export class OptionService {
  constructor(private readonly prisma: PrismaService) {}
  create(createOptionDto: CreateOptionDto) {
    return this.prisma.option.create({
      data: createOptionDto,
    });
  }

  findAll() {
    return this.prisma.option.findMany();
  }

  findOne(id: number) {
    return this.prisma.option.findFirst({
      where: {
        id,
      },
    });
  }

  update(id: number, updateOptionDto: UpdateOptionDto) {
    return this.prisma.option.update({
      where: {
        id,
      },
      data: updateOptionDto,
    });
  }

  remove(id: number) {
    return this.prisma.option.delete({
      where: {
        id,
      },
    });
  }
}
