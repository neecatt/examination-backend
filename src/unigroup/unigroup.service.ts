import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUnigroupDto } from './dto/create-unigroup.dto';
import { UpdateUnigroupDto } from './dto/update-unigroup.dto';
import { UniGroup } from '@prisma/client';

@Injectable()
export class UnigroupService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createUnigroupDto: CreateUnigroupDto): Promise<UniGroup> {
    try {
      const { teacherIds, subjectIds, ...unigroupData } = createUnigroupDto;

      const teacherIdArray = teacherIds
        ? teacherIds.map((teacherId) => {
            return { Teachers: { connect: { teacherId } } };
          })
        : [];

      const subjectIdArray = subjectIds
        ? subjectIds.map((subjectId) => {
            return { Subjects: { connect: { subjectId } } };
          })
        : [];

      return await this.prisma.uniGroup.create({
        data: {
          ...teacherIdArray,
          ...subjectIdArray,
          ...unigroupData,
        },
        include: {
          Teachers: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          Subjects: true,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<UniGroup[]> {
    const uniGroups = await this.prisma.uniGroup.findMany({
      include: {
        Teachers: {
          select: {
            id: true,
            name: true,
            email: true,
            password: false,
          },
        },
        Subjects: true,
      },
    });

    if (uniGroups.length === 0)
      throw new NotFoundException('Unigroups not found');

    return uniGroups;
  }

  async findOne(id: number): Promise<UniGroup> {
    const unigroup = await this.prisma.uniGroup.findUnique({
      where: {
        id,
      },
      include: {
        Teachers: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        Subjects: true,
      },
    });
    if (!unigroup) {
      throw new Error(`Unigroup with id ${id} not found`);
    }
    return unigroup;
  }

  async update(
    id: number,
    updateUnigroupDto: UpdateUnigroupDto,
  ): Promise<UniGroup> {
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

  async remove(id: number): Promise<UniGroup> {
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
