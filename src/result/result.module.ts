import { Module } from '@nestjs/common';
import { ResultService } from './result.service';
import { ResultController } from './result.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ResultController],
  providers: [ResultService, PrismaService],
})
export class ResultModule {}
