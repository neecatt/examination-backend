import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import * as bcrypt from 'bcrypt';
import { Teacher } from '@prisma/client';

/**
 *
 * @export
 * @class TeacherService
 * @typedef {TeacherService}
 */
@Injectable()
export class TeacherService {
  /**
   * Creates an instance of TeacherService.
   *
   * @constructor
   * @param {PrismaService} prisma
   */
  constructor(private prisma: PrismaService) {}

  /**
   *
   * @async
   * @param {CreateTeacherDto} createTeacherDto
   * @returns {Promise<Teacher>}
   */
  async create(createTeacherDto: CreateTeacherDto): Promise<Teacher> {
    const salt = bcrypt.genSaltSync(10);

    const hash = bcrypt.hashSync(createTeacherDto.password, salt);
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

    const { ...teacherData } = createTeacherDto;

    return await this.prisma.teacher.create({
      data: {
        ...teacherData,
      },
      include: {
        Subjects: true,
        Unigroups: true,
      },
    });
  }

  /**
   *
   * @async
   * @returns {unknown}
   */
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

  /**
   *
   * @async
   * @param {number} id
   * @returns {Promise<Teacher>}
   */
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

  /**
   *
   * @async
   * @param {string} email
   * @returns {Promise<Teacher>}
   */
  async findOneByEmail(email: string): Promise<Teacher> {
    const teacher = await this.prisma.teacher.findUnique({
      where: {
        email,
      },
    });

    if (!teacher) throw new NotFoundException('Teacher not found');

    return teacher;
  }

  /**
   *
   * @async
   * @param {Teacher} teacher
   * @returns {Promise<Teacher>}
   */
  async getTeacherInfo(teacher: Teacher): Promise<Teacher> {
    return await this.findOneByEmail(teacher.email);
  }

  /**
   *
   * @async
   * @param {number} id
   * @param {UpdateTeacherDto} updateTeacherDto
   * @returns {Promise<Teacher>}
   */
  async update(
    id: number,
    updateTeacherDto: UpdateTeacherDto,
  ): Promise<Teacher> {
    try {
      const { subjectIds, unigroupIds, is_active, ...teacherData } =
        updateTeacherDto;

      const subjectIdArray = subjectIds
        ? updateTeacherDto.subjectIds.map((id) => {
            return { id };
          })
        : [];

      const unigroupIdArray = unigroupIds
        ? updateTeacherDto.unigroupIds.map((id) => {
            return { id };
          })
        : [];

      return await this.prisma.teacher.update({
        where: {
          id,
        },
        data: {
          Subjects: { connect: subjectIdArray },
          Unigroups: { connect: unigroupIdArray },
          is_active: is_active ?? false,
          ...teacherData,
        },
        include: {
          Subjects: true,
          Unigroups: true,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   *
   * @async
   * @param {number} id
   * @returns {Promise<Teacher>}
   */
  async remove(id: number): Promise<Teacher> {
    try {
      return await this.prisma.teacher.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
