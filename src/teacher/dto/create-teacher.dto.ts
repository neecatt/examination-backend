import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateTeacherDto {
  @IsString()
  name: string;

  @IsString()
  surname: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsOptional()
  is_active: boolean;

  @IsOptional()
  subjectIds: number[];

  @IsOptional()
  unigroupIds: number[];
}
