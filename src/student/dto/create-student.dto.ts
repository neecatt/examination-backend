import { UniGroup } from '@prisma/client';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateUnigroupDto } from 'src/unigroup/dto/create-unigroup.dto';

export class CreateStudentDto {
  @IsString()
  name: string;

  @IsString()
  surname: string;

  @IsNumber()
  unigroupId: number;
}
