import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';

@Injectable()
export class SubjectService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createSubjectDto: CreateSubjectDto) {
    const { teacherIds, unigroupIds, questionIds, ...subjectData } =
      createSubjectDto;

    const teacherIdArray = teacherIds?.reduce(
      (acc, id) => [...acc, { Teacher: { connect: { id } } }],
      [],
    );

    const unigroupIdArray = unigroupIds?.reduce(
      (acc, id) => [...acc, { UniGroup: { connect: { id } } }],
      [],
    );

    const questionIdArray = questionIds?.reduce(
      (acc, id) => [...acc, { id }],
      [],
    );

    try {
      return await this.prisma.subject.create({
        data: {
          ...subjectData,
          Teachers: { create: teacherIdArray },
          Unigroups: { create: unigroupIdArray },
          Questions: { connect: questionIdArray },
        },
        select: {
          id: true,
          name: true,
          description: true,
          Teachers: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          Unigroups: {
            select: {
              id: true,
              name: true,
            },
          },
          Questions: {
            select: {
              id: true,
              question: true,
            },
          },
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    return await this.prisma.subject.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        Teachers: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        Unigroups: {
          select: {
            id: true,
            name: true,
          },
        },
        Questions: {
          select: {
            id: true,
            question: true,
          },
        },
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.subject.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateSubjectDto: UpdateSubjectDto) {
    return await this.prisma.subject.update({
      where: {
        id,
      },
      data: {
        ...updateSubjectDto,
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.subject.delete({
      where: {
        id,
      },
    });
  }
}
