import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from 'src/auth/dto/create-auth.dto';
import { PrismaService } from 'src/prisma.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Injectable()
export class QuestionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createQuestionDto: CreateQuestionDto) {
    const { subjectId, answerId, ...rest } = createQuestionDto;
    const question = await this.prisma.question.create({
      data: {
        subject: { connect: { id: subjectId } },
        ...rest,
      },
    });
    return question;
  }
  // }
  findAll() {
    return this.prisma.question.findMany();
  }
  findOne(id: number) {
    return this.prisma.question.findUnique({
      where: {
        id,
      },
    });
  }
  update(id: number, updateQuestionDto: UpdateQuestionDto) {
    return this.prisma.question.update({
      where: {
        id,
      },
      data: updateQuestionDto,
    });
  }
  remove(id: number) {
    return this.prisma.question.delete({
      where: {
        id,
      },
    });
  }
}
