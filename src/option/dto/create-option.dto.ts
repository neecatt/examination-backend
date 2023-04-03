import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateOptionDto {
  @IsString()
  option: string;

  @IsBoolean()
  is_correct: boolean;

  @IsOptional()
  questionId: number;
}
