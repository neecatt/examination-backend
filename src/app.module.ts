import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TeacherModule } from './teacher/teacher.module';
import { StudentModule } from './student/student.module';
import { QuestionModule } from './question/question.module';
import { SubjectModule } from './subject/subject.module';
import { Passport } from 'passport';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthService } from './auth/auth.service';
import { PrismaService } from './prisma.service';
import { TeacherService } from './teacher/teacher.service';

@Module({
  imports: [
    AuthModule,
    TeacherModule,
    StudentModule,
    QuestionModule,
    SubjectModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
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
