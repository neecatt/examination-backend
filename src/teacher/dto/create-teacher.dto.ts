import { Optional } from '@nestjs/common';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateTeacherDto {
  @IsString()
  name: string;

  @IsString()
  surname: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsOptional()
  is_active: boolean;

  @IsOptional()
  subjectIds: number[];
}
