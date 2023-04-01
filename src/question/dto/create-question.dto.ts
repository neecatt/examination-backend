import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateQuestionDto {
  @IsString()
  @IsNotEmpty()
  question: string;

  @IsString()
  filename: string;

  @IsString()
  url: string;

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
