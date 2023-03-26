import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { BadRequestException, Injectable } from '@nestjs/common';
import { TeacherService } from 'src/teacher/teacher.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly teacherService: TeacherService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    try {
      const teacher = await this.teacherService.findOneByEmail(payload.email);

      if (!teacher) {
        throw new BadRequestException('Invalid token');
      }

      return teacher;
    } catch (error) {
      throw new Error('Unable to validate token');
    }
  }
}
