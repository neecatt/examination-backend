import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TeacherModule } from './teacher/teacher.module';
import { StudentModule } from './student/student.module';
import { QuestionModule } from './question/question.module';
import { SubjectModule } from './subject/subject.module';
import { PassportModule } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth/auth.service';
import { PrismaService } from './prisma.service';
import { TeacherService } from './teacher/teacher.service';
import { UnigroupModule } from './unigroup/unigroup.module';
import { UploadModule } from './upload/upload.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    AuthModule,
    TeacherModule,
    StudentModule,
    QuestionModule,
    SubjectModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    UnigroupModule,
    UploadModule,
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AuthService,
    PrismaService,
    TeacherService,
    JwtService,
  ],
  exports: [AuthService, PrismaService],
})
export class AppModule {}
