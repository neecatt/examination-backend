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

    const { is_active, ...teacherData } = createTeacherDto;

    return await this.prisma.teacher.create({
      data: {
        is_active: is_active ? is_active : false,
        ...teacherData,
      },
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
        Subjects: true,
        Unigroups: true,
      },
    });
  }

  async findOne(id: number): Promise<Teacher> {
    const teacher = await this.prisma.teacher.findUnique({
      where: {
        id,
      },
      include: {
        Subjects: true,
        Unigroups: true,
      },
    });
    delete teacher.password;
    return teacher;
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

  //Update api do not take dublicate data
  async update(id: number, updateTeacherDto: UpdateTeacherDto) {
    try {
      const { subjectIds, unigroupIds, is_active, ...teacherData } =
        updateTeacherDto;

      const subjectIdArray = subjectIds
        ? updateTeacherDto.subjectIds.map((id) => {
            console.log(id);
            return { id };
          })
        : [];

      const unigroupIdArray = unigroupIds
        ? updateTeacherDto.unigroupIds.map((id) => {
            console.log(id);
            return { id };
          })
        : [];

      return this.prisma.teacher.update({
        where: {
          id,
        },
        data: {
          Subjects: { connect: subjectIdArray },
          Unigroups: { connect: unigroupIdArray },
          is_active: is_active ? is_active : false,
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
              id: true,
            },
          },
          Unigroups: {
            select: {
              id: true,
            },
          },
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    return this.prisma.teacher.delete({
      where: {
        id,
      },
    });
  }
}
