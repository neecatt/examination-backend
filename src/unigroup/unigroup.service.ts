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
      return await this.prisma.uniGroup.findMany({
        include: {
          Teachers: {
            select: {
              teacherId: true,
            },
          },
          Subjects: {
            select: {
              subjectId: true,
            },
          },
        },
      });
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

  async findSubjectsByUnigroupId(id: number) {
    try {
      const subjects = await this.prisma.subjectOnUnigroups.findMany({
        where: {
          unigroupId: id,
        },
        include: {
          Subject: true,
        },
      });
      if (!subjects) {
        throw new Error(`Subjects for UniGroup with id ${id} not found`);
      }
      return subjects;
    } catch (error) {
      throw error;
    }
  }

  async findAllSubjectsAndUnigroups() {
    try {
      const data = await this.prisma.subjectOnUnigroups.findMany({
        include: {
          Subject: true,
          UniGroup: true,
        },
      });
      if (!data) {
        throw new Error(`Subjects and UniGroups not found`);
      }
      return data;
    } catch (error) {
      throw error;
    }
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
      await this.prisma.teacherOnUnigroups.deleteMany({
        where: {
          unigroupId: id,
        },
      });

      await this.prisma.subjectOnUnigroups.deleteMany({
        where: {
          unigroupId: id,
        },
      });

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
