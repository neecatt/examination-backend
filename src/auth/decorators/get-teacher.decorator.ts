import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Teacher } from '@prisma/client';

export const GetTeacher = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): Teacher => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
