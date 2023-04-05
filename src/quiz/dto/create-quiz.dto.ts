import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateQuizDto {
  @IsNumber()
  subjectId: number;

  @IsNumber()
  groupId: number;

  @IsNotEmpty()
  @IsNumber({}, { each: true })
  questionIds: number[];

  @IsOptional()
  @IsNumber({}, { each: true })
  results: number[];
}
