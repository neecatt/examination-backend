import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateOptionDto {
  @IsString()
  @IsNotEmpty()
  option: string;

  @IsBoolean()
  is_correct: boolean;

  @IsOptional()
  questionId: number;
}
