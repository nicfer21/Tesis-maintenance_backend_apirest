import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JsonWebTokenError, JwtService, TokenExpiredError } from '@nestjs/jwt';
import { IS_PUBLIC_KEY } from '../../decorators/public/public.decorator';
import type { Request } from 'express';
import { RedisService } from '../../redis/redis.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private reflector: Reflector,
    private redis: RedisService,
  ) {
    this.prefix = process.env.REDIS_PREFIX;
    if (!this.prefix) {
      throw new Error('REDIS_PREFIX environment variable is not configured');
    }
  }

  private branchKey = 'Auth';
  private branchMovilKey = 'AuthMovil';
  private prefix: string | undefined;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const req = await context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(req);

    if (!token) {
      throw new UnauthorizedException('Auth:No token');
    }

    try {
      //Estrae los datos del token
      const payload = await this.jwtService.verifyAsync(token);
      const id = payload.id;
      const isMovil = payload.isMovil ?? false;

      const branchString = `${this.prefix}:${isMovil ? this.branchMovilKey : this.branchKey}:${id}:token`;

      const verifyTokenInRedis = await this.redis.getKey(branchString);

      if (verifyTokenInRedis == token) {
        //Lo guarda en el request
        req['worker'] = payload;
        return true;
      }
    } catch (error: any) {
      //Evalúa si es un error de token expirado o de codificación de token
      //En caso de token expirado y este en memoria de Redis, se permite que el usuario pueda renovar su token
      if (error.name == 'TokenExpiredError') {
        const payload = await this.jwtService.decode(token);
        const id = payload.id;
        const isMovil = payload.isMovil ?? false;

        const branchString = `${this.prefix}:${isMovil ? this.branchMovilKey : this.branchKey}:${id}:token`;

        const verifyTokenInRedis = await this.redis.getKey(branchString);

        if (verifyTokenInRedis == token) {
          throw new UnauthorizedException('Auth:Expired Token, Can be renewed');
        } else {
          throw new UnauthorizedException('Auth:Expired Token');
        }
      } else if (error.name == 'JsonWebTokenError')
        throw new UnauthorizedException('Auth:Invalid Token-JWTError');
    }
    return false;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
