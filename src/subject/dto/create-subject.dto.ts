import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateSubjectDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  credit: number;

  @IsOptional()
  teacherIds: number[];

  @IsOptional()
  unigroupIds: number[];

  @IsOptional()
  questionIds: number[];
}
