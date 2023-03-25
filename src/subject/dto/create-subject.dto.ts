import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateSubjectDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  credit: number;

  @IsOptional()
  @IsNumber({}, { each: true })
  teacherIds: number[];

  @IsOptional()
  @IsNumber({}, { each: true })
  unigroupIds: number[];

  @IsOptional()
  @IsNumber({}, { each: true })
  questionIds?: number[];
}
