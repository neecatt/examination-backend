import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Teacher } from '.prisma/client';
import { ValidationDto } from './types';

@Injectable()
export class TeacherAuthStrategy extends PassportStrategy(Strategy, 'teacher') {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
      ignoreExpiration: false,
    });
  }

  async validate(payload: ValidationDto): Promise<Teacher> {
    const teacher = await this.authService.validateTeacher(
      payload.email,
      payload.password,
    );
    if (!teacher) {
      throw new UnauthorizedException();
    }
    return teacher;
  }
}
