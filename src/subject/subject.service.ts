import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { Subject } from '@prisma/client';

@Injectable()
export class SubjectService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createSubjectDto: CreateSubjectDto): Promise<Subject> {
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
        include: {
          Teachers: true,
          Unigroups: true,
          Questions: true,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<Subject[]> {
    try {
      return await this.prisma.subject.findMany({
        include: {
          Teachers: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          Unigroups: true,
          Questions: true,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number): Promise<Subject> {
    const subject = await this.prisma.subject.findUnique({
      where: {
        id,
      },
    });
    if (!subject) {
      throw new NotFoundException('Subject not found');
    }
    return subject;
  }

  async update(
    id: number,
    updateSubjectDto: UpdateSubjectDto,
  ): Promise<Subject> {
    try {
      return await this.prisma.subject.update({
        where: {
          id,
        },
        data: {
          ...updateSubjectDto,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number): Promise<Subject> {
    try {
      return await this.prisma.subject.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
