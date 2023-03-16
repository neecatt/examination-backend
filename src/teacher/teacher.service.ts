import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class TeacherService {
  constructor(private prisma: PrismaService) {}

  async create(createTeacherDto: CreateTeacherDto) {
    const salt = bcrypt.genSaltSync(10);

    const { subjectIds, ...teacherData } = createTeacherDto;

    const hash = await bcrypt.hashSync(createTeacherDto.password, salt);
    teacherData.password = hash;
    const subjectIdArray = createTeacherDto.subjectIds.map((id) => {
      return { Subject: { connect: { id } } };
    });

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
      data: {
        Subjects: {
          create: subjectIdArray,
        },
        ...teacherData,
      },
    });
  }

  async findAll() {
    return await this.prisma.teacher.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.teacher.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: number, updateTeacherDto: UpdateTeacherDto) {
    return this.prisma.teacher.update({
      where: {
        id,
      },
      data: updateTeacherDto,
    });
  }

  async remove(id: number) {
    const teacher = await this.prisma.teacher.findUnique({
      where: {
        id,
      },
      include: {
        Subjects: true,
      },
    });

    await this.prisma.teacherOnSubjects.deleteMany({
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
