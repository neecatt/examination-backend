import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
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
        },
      });

      return student;
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      return await this.prisma.student.findMany();
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      const student = await this.prisma.student.findUnique({
        where: {
          id,
        },
      });

      if (!student) {
        throw new Error(`Student with id ${id} not found`);
      }
      return student;
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    try {
      return await this.prisma.student.update({
        where: {
          id,
        },
        data: {
          ...updateStudentDto,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.student.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
