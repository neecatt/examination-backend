import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import mammoth from 'mammoth';
import { forEach } from 'jszip';

@ApiTags('question')
@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  create(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionService.create(createQuestionDto);
  }

  @Get()
  findAll() {
    return this.questionService.findAll();
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const filename = file.originalname;
          cb(null, filename);
        },
      }),
    }),
  )
  async uploadFile(
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    if (
      file.mimetype !=
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) {
      throw new BadRequestException('File type is not supported');
    }
    let content = [];
    const mammoth = require('mammoth');
    mammoth
      .extractRawText({ path: file.path })
      .then(function (result) {
        const text = result.value; // The raw text
        //split text by new line
        const lines = text.split('\n');
        //if line contains '' then remove it
        for (let i = 0; i < lines.length + 1; i++) {
          if (lines[i] == '' || lines[i] == ' ') {
            lines.splice(i, 1);
          }
        }
        //if last line is empty remove it
        if (lines[lines.length - 1] == '' || lines[lines.length - 1] == ' ') {
          lines.pop();
        }
        //Iterate over lines and if last line contains in one of them get this line
        const length = lines.length;
        const lastLine = lines[length - 1];
        for (let i = 0; i < length - 2; i++) {
          if (lines[i].includes(lastLine)) {
          }
        }
        const messages = result.messages; // Any messages, such as warnings during conversion
        return lines;
      })
      .then((lines) => {
        // console.log(lines);
        content = lines;
        // console.log(content);
      })
      .catch((error) => {
        console.log(error);
      });
    return this.questionService.uploadFile(file);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    return this.questionService.update(+id, updateQuestionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionService.remove(+id);
  }
}
