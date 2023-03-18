import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateQuestionDto {
  @IsString()
  @IsNotEmpty()
  question: string;

  @IsNumber()
  @IsNotEmpty()
  answerId: number;

  @IsNumber()
  @IsNotEmpty()
  subjectId: number;

  @IsString()
  @IsOptional()
  options: {
    OptionA: string;
    OptionB: string;
    OptionC: string;
    OptionD: string;
    OptionE: string;
  };
}
