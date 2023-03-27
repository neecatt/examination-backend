import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import * as bcrypt from 'bcrypt';
import { Teacher } from '@prisma/client';

@Injectable()
export class TeacherService {
  constructor(private prisma: PrismaService) {}

  async create(createTeacherDto: CreateTeacherDto) {
    const salt = bcrypt.genSaltSync(10);

    const hash = await bcrypt.hashSync(createTeacherDto.password, salt);
    createTeacherDto.password = hash;

    //throw exception if teacher email already exists
    const teacher = await this.prisma.teacher.findUnique({
      where: {
        email: createTeacherDto.email,
      },
    });
    if (teacher) {
      throw new BadRequestException('Teacher email already exists');
    }

    return await this.prisma.teacher.create({
      data: createTeacherDto,
      select: {
        id: true,
        name: true,
        surname: true,
        password: false,
        email: true,
        is_active: true,
        Subjects: true,
        Unigroups: true,
      },
    });
  }

  async findAll() {
    return await this.prisma.teacher.findMany({
      select: {
        id: true,
        name: true,
        surname: true,
        password: false,
        email: true,
        is_active: true,
        Subjects: {
          select: {
            subjectId: true,
          },
        },
        Unigroups: {
          select: {
            unigroupId: true,
          },
        },
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.teacher.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        surname: true,
        password: false,
        email: true,
        is_active: true,
        Subjects: {
          select: {
            subjectId: true,
          },
        },
        Unigroups: {
          select: {
            unigroupId: true,
          },
        },
      },
    });
  }

  async findOneByEmail(email: string) {
    return await this.prisma.teacher.findUnique({
      where: {
        email,
      },
    });
  }

  async getTeacherInfo(teacher: Teacher) {
    return await this.findOneByEmail(teacher.email);
  }

  async update(id: number, updateTeacherDto: UpdateTeacherDto) {
    try {
      const { subjectIds, unigroupIds, ...teacherData } = updateTeacherDto;

      const subjectIdArray = subjectIds
        ? updateTeacherDto.subjectIds.map((id) => {
            console.log(id);
            return { Subject: { connect: { id } } };
          })
        : [];

      const unigroupIdArray = unigroupIds
        ? updateTeacherDto.unigroupIds.map((id) => {
            console.log(id);
            return { UniGroup: { connect: { id } } };
          })
        : [];

      return this.prisma.teacher.update({
        where: {
          id,
        },
        data: {
          Subjects: { create: subjectIdArray },
          Unigroups: { create: unigroupIdArray },
          ...teacherData,
        },
        select: {
          id: true,
          name: true,
          surname: true,
          password: false,
          email: true,
          is_active: true,
          Subjects: {
            select: {
              subjectId: true,
            },
          },
          Unigroups: {
            select: {
              unigroupId: true,
            },
          },
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    await this.prisma.teacherOnSubjects.deleteMany({
      where: {
        teacherId: id,
      },
    });

    await this.prisma.teacherOnUnigroups.deleteMany({
      where: {
        teacherId: id,
      },
    });

    return this.prisma.teacher.delete({
      where: {
        id,
      },
    });
  }
}
