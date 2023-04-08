import { IsNumber } from 'class-validator';

export class FindQuizDto {
  @IsNumber()
  subjectId: number;

  @IsNumber()
  groupId: number;
}
