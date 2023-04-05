import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateResultDto {
  @IsString()
  student: string;

  @IsNumber()
  @IsOptional()
  quizId: number;

  @IsNumber()
  scoreAchieved: number;

  @IsNumber()
  scoreTotal: number;
}
