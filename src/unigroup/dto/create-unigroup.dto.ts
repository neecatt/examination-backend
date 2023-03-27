import { IsOptional, IsString } from 'class-validator';

export class CreateUnigroupDto {
  @IsString()
  name: string;

  @IsOptional()
  subjectIds: number[];

  @IsOptional()
  teacherIds: number[];
}
