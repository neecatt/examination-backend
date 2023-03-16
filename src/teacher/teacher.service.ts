import { Injectable } from '@nestjs/common';
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
    return await this.prisma.teacher.create({
      data: {
        Subjects: {
          create: subjectIdArray,
        },
        ...teacherData,
      },
    });
  }

  findAll() {
    return `This action returns all teacher`;
  }

  findOne(id: number) {
    return `This action returns a #${id} teacher`;
  }

  update(id: number, updateTeacherDto: UpdateTeacherDto) {
    return `This action updates a #${id} teacher`;
  }

  remove(id: number) {
    return `This action removes a #${id} teacher`;
  }
}
