import { IsNumber, IsString } from 'class-validator';

export class CreateStudentDto {
  @IsString()
  name: string;

  @IsString()
  surname: string;

  @IsNumber()
  unigroupId: number;
}
