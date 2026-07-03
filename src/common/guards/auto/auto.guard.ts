import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../../decorators/roles/roles.decorator';

@Injectable()
export class AutoGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    //Obtener los decoradores y comparar si tiene el que pusimos
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    // Si no hay etiqueta de roles, no pasa nada
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    //obtiene el payload del guard de auth
    const req = context.switchToHttp().getRequest();
    const worker = req.worker;

    // Si no tiene la etiqueta de role no funciona
    if (!worker || !worker.worker_level) {
      throw new ForbiddenException('Auto:No indicate Role');
    }

    /* todos los roles
    ADMIN
    ENGINEER
    WORKER
*/

    if (
      worker.worker_level != 'ADMIN' &&
      worker.worker_level != 'ENGINEER' &&
      worker.worker_level != 'WORKER'
    ) {
      throw new ForbiddenException('Auto:Invalid Role');
    }

    //Recorre la lista de roles requeridos de la etiqueta
    for (let i = 0; i < requiredRoles.length; i++) {
      if (worker.worker_level == requiredRoles[i]) {
        return true;
      }
    }
    throw new ForbiddenException('Auto:Unauthorized Role');
  }
}
