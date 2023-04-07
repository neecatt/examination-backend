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
import { ApiTags } from '@nestjs/swagger';

@ApiTags('unigroup')
@Controller('unigroup')
export class UnigroupController {
  constructor(private readonly unigroupService: UnigroupService) {}

  @Post()
  async create(@Body() createUnigroupDto: CreateUnigroupDto) {
    return await this.unigroupService.create(createUnigroupDto);
  }

  @Get()
  async findAll() {
    return await this.unigroupService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.unigroupService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUnigroupDto: UpdateUnigroupDto,
  ) {
    return await this.unigroupService.update(+id, updateUnigroupDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.unigroupService.remove(+id);
  }
}
