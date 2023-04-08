import { ForbiddenException, Injectable } from '@nestjs/common';
import { TeacherService } from 'src/teacher/teacher.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

/**
 *
 * @export
 * @class AuthService
 * @typedef {AuthService}
 */
@Injectable()
export class AuthService {
  /**
   * Creates an instance of AuthService.
   *
   * @constructor
   * @param {TeacherService} teacherService
   * @param {JwtService} jwtService
   */

  constructor(
    private readonly teacherService: TeacherService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   *
   * @async
   * @param {CreateAuthDto} createAuthDto
   * @returns {Promise<{ access_token: string }>}
   */
  async login(createAuthDto: CreateAuthDto): Promise<{ access_token: string }> {
    try {
      const teacher = await this.teacherService.findOneByEmail(
        createAuthDto.email,
      );

      const isPasswordValid = await bcrypt.compare(
        createAuthDto.password,
        teacher.password,
      );

      if (!isPasswordValid) {
        throw new ForbiddenException('Password is not correct!');
      }

      return {
        access_token: this.jwtService.sign({
          email: teacher.email,
          sub: teacher.id,
        }),
      };
    } catch (error) {
      throw error;
    }
  }
}
