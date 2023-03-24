import { Module } from '@nestjs/common';
import { UnigroupService } from './unigroup.service';
import { UnigroupController } from './unigroup.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [UnigroupController],
  providers: [UnigroupService, PrismaService],
})
export class UnigroupModule {}
