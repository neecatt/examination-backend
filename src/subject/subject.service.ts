import { Injectable } from '@nestjs/common';
import { connect } from 'http2';
import { PrismaService } from 'src/prisma.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';

@Injectable()
export class SubjectService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createSubjectDto: CreateSubjectDto) {
    const { teacherIds, unigroupIds, questionIds, ...subjectData } =
      createSubjectDto;
    let teacherIdArray;
    if (teacherIds) {
      teacherIdArray = teacherIds.map((id) => {
        return { Teacher: { connect: { id } } };
      });
    }

    let unigroupIdArray;
    if (unigroupIds) {
      unigroupIdArray = unigroupIds.map((id) => {
        return { UniGroup: { connect: { id } } };
      });
    }

    let questionIdArray;
    if (questionIds) {
      questionIdArray = questionIds.map((id) => {
        return { id };
      });
    }

    try {
      return await this.prisma.subject.create({
        data: {
          ...subjectData,
          Teachers: { create: teacherIdArray },
          Unigroups: { create: unigroupIdArray },
          Questions: { connect: questionIdArray },
        },
      });
    } catch (error) {
      throw error;
    }
  }

  findAll() {
    return this.prisma.subject.findMany();
  }

  findOne(id: number) {
    return this.prisma.subject.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: number, updateSubjectDto: UpdateSubjectDto) {
    return this.prisma.subject.update({
      where: {
        id,
      },
      data: {
        ...updateSubjectDto,
      },
    });
  }

  async remove(id: number) {
    return this.prisma.subject.delete({
      where: {
        id,
      },
    });
  }
}
