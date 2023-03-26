import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateTeacherDto } from 'src/teacher/dto/create-teacher.dto';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createStudentDto: CreateStudentDto) {
    const { unigroupId, ...studentData } = createStudentDto;

    try {
      const student = await this.prisma.student.create({
        data: {
          ...studentData,
          unigroup: {
            connect: {
              id: unigroupId,
            },
          },
        },
      });

      return student;
    } catch (error) {
      throw error;
    }
  }

  findAll() {
    return this.prisma.student.findMany();
  }

  findOne(id: number) {
    try {
      return this.prisma.student.findUnique({
        where: {
          id,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  update(id: number, updateStudentDto: UpdateStudentDto) {
    return this.prisma.student.update({
      where: {
        id,
      },
      data: {
        ...updateStudentDto,
      },
    });
  }

  remove(id: number) {
    return this.prisma.student.delete({
      where: {
        id,
      },
    });
  }
}
