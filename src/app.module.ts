import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TeacherModule } from './teacher/teacher.module';
import { QuestionModule } from './question/question.module';
import { SubjectModule } from './subject/subject.module';
import { PassportModule } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth/auth.service';
import { PrismaService } from './prisma.service';
import { TeacherService } from './teacher/teacher.service';
import { UnigroupModule } from './unigroup/unigroup.module';
import { MulterModule } from '@nestjs/platform-express';
import { OptionModule } from './option/option.module';
import { QuizModule } from './quiz/quiz.module';
import { ResultModule } from './result/result.module';

@Module({
  imports: [
    AuthModule,
    TeacherModule,
    QuestionModule,
    SubjectModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    UnigroupModule,
    MulterModule.register({
      dest: './uploads',
    }),
    OptionModule,
    QuizModule,
    ResultModule,
  ],
  providers: [AuthService, PrismaService, TeacherService, JwtService],
  exports: [AuthService, PrismaService],
})
export class AppModule {}
