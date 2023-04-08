import { PartialType } from '@nestjs/swagger';
import { CreateQuizDto } from './create-quiz.dto';
import { IsOptional } from 'class-validator';

export class UpdateQuizDto extends PartialType(CreateQuizDto) {
  @IsOptional()
  subjectId?: number;

  @IsOptional()
  groupId?: number;
}
