import { PartialType } from '@nestjs/mapped-types';
import { CreateUnigroupDto } from './create-unigroup.dto';

export class UpdateUnigroupDto extends PartialType(CreateUnigroupDto) {}
