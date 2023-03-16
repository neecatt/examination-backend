import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { PrismaService } from 'src/prisma.service';
import { Teacher } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private prisma: PrismaService) {}

  async validateTeacher(email: string, password: string): Promise<Teacher> {
    const teacher = await this.prisma.teacher.findUnique({
      where: {
        email: email,
      },
    });
    if (!teacher) {
      return null;
    }
    const isPasswordValid = await bcrypt.compare(password, teacher.password);
    if (!isPasswordValid) {
      return null;
    }
    return teacher;
  }

  async login(teacher: Teacher) {
    const payload = { email: teacher.email, sub: teacher.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
