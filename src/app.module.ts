import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TeacherModule } from './teacher/teacher.module';
import { StudentModule } from './student/student.module';
import { QuestionModule } from './question/question.module';
import { SubjectModule } from './subject/subject.module';

@Module({
  imports: [AuthModule, UsersModule, TeacherModule, StudentModule, QuestionModule, SubjectModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
