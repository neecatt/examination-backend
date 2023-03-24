import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUnigroupDto } from './dto/create-unigroup.dto';
import { UpdateUnigroupDto } from './dto/update-unigroup.dto';

@Injectable()
export class UnigroupService {
  constructor(private readonly prisma: PrismaService) {}
  create(createUnigroupDto: CreateUnigroupDto) {
    try {
      return this.prisma.uniGroup.create({
        data: {
          ...createUnigroupDto,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  findAll() {
    return this.prisma.uniGroup.findMany();
  }

  findOne(id: number) {
    return this.prisma.uniGroup.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: number, updateUnigroupDto: UpdateUnigroupDto) {
    return this.prisma.uniGroup.update({
      where: {
        id,
      },
      data: {
        ...updateUnigroupDto,
      },
    });
  }

  remove(id: number) {
    return this.prisma.uniGroup.delete({
      where: {
        id,
      },
    });
  }
}
