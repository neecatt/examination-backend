import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UnigroupService } from './unigroup.service';
import { CreateUnigroupDto } from './dto/create-unigroup.dto';
import { UpdateUnigroupDto } from './dto/update-unigroup.dto';

@Controller('unigroup')
export class UnigroupController {
  constructor(private readonly unigroupService: UnigroupService) {}

  @Post()
  create(@Body() createUnigroupDto: CreateUnigroupDto) {
    return this.unigroupService.create(createUnigroupDto);
  }

  @Get()
  findAll() {
    return this.unigroupService.findAll();
  }
  @Get('/subjects')
  findAllUnigroupsAndSubjects() {
    console.log('auye');
    return this.unigroupService.findAllSubjectsAndUnigroups();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.unigroupService.findOne(+id);
  }

  @Get(':id/subjects')
  findSubjectsByUnigroupId(@Param('id') id: string) {
    return this.unigroupService.findSubjectsByUnigroupId(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUnigroupDto: UpdateUnigroupDto,
  ) {
    return this.unigroupService.update(+id, updateUnigroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.unigroupService.remove(+id);
  }
}
