import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateResultDto {
  @IsString()
  student: string;

  @IsNumber()
  quizId: number;

  @IsNumber()
  scoreAchieved: number;

  @IsNumber()
  scoreTotal: number;
}
