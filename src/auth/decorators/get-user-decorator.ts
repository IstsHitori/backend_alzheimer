import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';

//Decorador de parametro
export const GetUser = createParamDecorator((data, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest<{ user: User }>();

  if (!req.user)
    throw new InternalServerErrorException('User not found (request)');
  if (data) {
    return { email: req.user.email };
  }

  return req.user;
});
