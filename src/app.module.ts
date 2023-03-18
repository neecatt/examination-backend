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
import { JwtModule } from '@nestjs/jwt';
import { TeacherAuthStrategy } from './auth/teacher-auth.strategy';
import { AuthService } from './auth/auth.service';
import { PrismaService } from './prisma.service';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    TeacherModule,
    StudentModule,
    QuestionModule,
    SubjectModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, TeacherAuthStrategy, AuthService, PrismaService],
  exports: [TeacherAuthStrategy, AuthService, PrismaService],
})
export class AppModule {}
