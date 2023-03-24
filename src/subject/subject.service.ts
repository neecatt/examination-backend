import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';

@Injectable()
export class SubjectService {
  constructor(private readonly prisma: PrismaService) {}
  create(createSubjectDto: CreateSubjectDto) {
    const { teacherIds, unigroupIds, questionIds, ...subjectData } =
      createSubjectDto;
    const teacherIdArray = createSubjectDto.teacherIds.map((id) => {
      return { Teacher: { connect: { id } } };
    });
    const unigroupIdArray = createSubjectDto.unigroupIds.map((id) => {
      return { UniGroup: { connect: { id } } };
    });
    const questionIdArray = createSubjectDto.questionIds.map((id) => {
      return { id };
    });

    try {
      return this.prisma.subject.create({
        data: {
          ...subjectData,
          Teachers: {
            create: teacherIdArray,
          },
          Unigroups: {
            create: unigroupIdArray,
          },
          Questions: {
            connect: questionIdArray,
          },
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

  remove(id: number) {
    return this.prisma.subject.delete({
      where: {
        id,
      },
    });
  }
}
