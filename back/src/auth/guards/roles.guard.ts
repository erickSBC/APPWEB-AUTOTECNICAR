// roles.guard.ts
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

export const ROLES_KEY = 'roles';

export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles =
      this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);

    // Si el endpoint no tiene @Roles, se permite el acceso
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const req = context.switchToHttp().getRequest();
    const user = req.user;

   // console.log('Roles requeridos:', requiredRoles);
    //console.log('Usuario en request:', user);

    if (!user) {
      throw new ForbiddenException('Usuario no autenticado');
    }

    if (requiredRoles.includes(user.rol)) {
      return true;
    }

    throw new ForbiddenException('No tiene permiso para este recurso');
  }
}
