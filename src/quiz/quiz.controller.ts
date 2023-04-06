import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { QuizService } from './quiz.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post()
  async create(@Body() createQuizDto: CreateQuizDto) {
    return await this.quizService.create(createQuizDto);
  }

  @Get()
  async findAll() {
    return await this.quizService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.quizService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateQuizDto: UpdateQuizDto) {
    return await this.quizService.update(+id, updateQuizDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.quizService.remove(+id);
  }
}
