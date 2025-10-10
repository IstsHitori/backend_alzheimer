import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { META_ROLES } from 'src/auth/constants/meta-roles';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest<{ user: User }>();

    if (!req.user) throw new BadRequestException('User not found (request)');
    //Para acceder a la meta data del controlador
    const validRoles: string[] = this.reflector.get(
      META_ROLES,
      context.getHandler(),
    );

    if (!validRoles) return true;
    if (validRoles.length === 0) return true;

    if (!validRoles.includes(req.user.role))
      throw new ForbiddenException('User needs a valid role');

    console.log('pasó..');
    return true;
  }
}
