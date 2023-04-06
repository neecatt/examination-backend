import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { GetTeacher } from 'src/auth/decorators/get-teacher.decorator';
import { Teacher } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('teacher')
@Controller('teacher')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Post()
  async create(@Body() createTeacherDto: CreateTeacherDto) {
    return await this.teacherService.create(createTeacherDto);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  getTeacherInfo(@GetTeacher() teacher: Teacher): Teacher {
    return teacher;
  }

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return await this.teacherService.findOne(+id);
  }

  @Get()
  async findAll() {
    return await this.teacherService.findAll();
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTeacherDto: UpdateTeacherDto,
  ) {
    return await this.teacherService.update(+id, updateTeacherDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.teacherService.remove(+id);
  }
}
