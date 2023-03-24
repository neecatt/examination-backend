import { IsString } from 'class-validator';

export class CreateUnigroupDto {
  @IsString()
  name: string;
  subjectIds: number[];
}
