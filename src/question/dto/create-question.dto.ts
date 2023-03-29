import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateQuestionDto {
  @IsString()
  @IsNotEmpty()
  question: string;

  @IsString()
  fileurl: string;

  @IsNumber()
  @IsOptional()
  subjectId: number;

  @IsNumber()
  @IsOptional()
  groupId: number;

  @IsNumber()
  @IsOptional()
  options: number[];
}
