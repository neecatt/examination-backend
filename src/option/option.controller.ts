import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OptionService } from './option.service';
import { CreateOptionDto } from './dto/create-option.dto';
import { UpdateOptionDto } from './dto/update-option.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('option')
@Controller('option')
export class OptionController {
  constructor(private readonly optionService: OptionService) {}

  @Post()
  async create(@Body() createOptionDto: CreateOptionDto) {
    return await this.optionService.create(createOptionDto);
  }

  @Get()
  async findAll() {
    return await this.optionService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.optionService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateOptionDto: UpdateOptionDto,
  ) {
    return await this.optionService.update(+id, updateOptionDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.optionService.remove(+id);
  }
}
