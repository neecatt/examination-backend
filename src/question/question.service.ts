import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Injectable()
export class QuestionService {
  constructor(private readonly prisma: PrismaService) {}

  create(createQuestionDto: CreateQuestionDto) {
    // const {subjectId, ..data} = createQuestionDto;
    //   return this.prisma.question.create({
    //     data: {
    //       ...data,
    //       subject: {
    //         connect: {
    //           id: subjectId,
    //         },
    //       },
    //     },
    // });
    return null;
  }
  // }
  findAll() {
    return `This action returns all question`;
  }
  findOne(id: number) {
    return `This action returns a #${id} question`;
  }
  update(id: number, updateQuestionDto: UpdateQuestionDto) {
    return `This action updates a #${id} question`;
  }
  remove(id: number) {
    return `This action removes a #${id} question`;
  }
}
