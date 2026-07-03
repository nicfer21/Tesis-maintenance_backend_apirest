import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';

import { WorkerService } from '../worker/worker.service';
import { JwtService } from '@nestjs/jwt';
import type { Request } from 'express';
import crypto from 'crypto';
import { CreateRefreshDto } from './dto/create-refresh.dto';
import { RedisService } from '../../../common/redis/redis.service';

//Al final solo abra un token por usuario a la ves, se cerraría sesión del otro token
@Injectable()
export class AuthService {
  private branchKey = 'Auth';
  private branchMovilKey = 'AuthMovil';
  private prefix: string | undefined;

  constructor(
    private readonly worker: WorkerService,
    private readonly jwToken: JwtService,
    private readonly redis: RedisService,
  ) {
    this.prefix = process.env.REDIS_PREFIX;
    if (!this.prefix) {
      throw new Error('REDIS_PREFIX environment variable is not configured');
    }
  }

  async signIn(createAuthDto: CreateAuthDto, req: Request) {
    try {
      const validate = await this.worker.signIn(createAuthDto, req);
      if (!validate) {
        throw new UnauthorizedException('False credential');
      }

      //UUIDs para el refresh tokens
      const serverUUID = crypto.randomUUID();

      const clientUUID = createAuthDto.clientUUID;

      const payload = {
        id: validate.id,
        firstname: validate.firstname,
        lastname: validate.lastname,
        image: validate.image,
        worker_level: validate.worker_level,
        uuid: serverUUID,
        isMovil: createAuthDto.isMovil,
      };

      const token = await this.jwToken.signAsync(payload);

      //Limpiar memoria de Redis antes de guardar nuevo token
      const clearResult = await this.clearToken(
        validate.id,
        createAuthDto.isMovil,
      );
      if (!clearResult) {
        console.log(
          'Warning: Could not clear previous session for user:',
          validate.id,
        );
      }

      await this.saveDataToken(
        serverUUID,
        token,
        validate.id,
        clientUUID,
        createAuthDto.isMovil,
      );

      return {
        access_token: token,
      };
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  async refreshToken(req: Request, createRefreshDto: CreateRefreshDto) {
    try {
      //Obtiene el token y lo corta
      const [typeAuth, tokenAuth] = req.headers.authorization?.split(' ') ?? [];
      const token = typeAuth === 'Bearer' ? tokenAuth : undefined;
      //verifica si el token esta completo
      if (!token) {
        throw new UnauthorizedException('No token');
      }

      if (token !== createRefreshDto.token) {
        throw new UnauthorizedException('Token Stolen');
      }

      const payload = await this.jwToken.decode(token);

      if (!payload.id) {
        throw new UnauthorizedException('Cant read Token');
      }

      /* 
      const nowTime = Math.floor(Date.now() / 1000);
      console.log(payload);
      console.log(nowTime);
 */
      /* //Verifica si el token aun no expira, evita que se refresque si aun esta activo
      if (payload.exp > nowTime) {
        throw new UnauthorizedException('Cant Refresh token');
      } */

      //Mejor que pueda actualizar el token, pero dependiendo de como lo lea el frontend

      //Cargar datos del Redis
      const loadToken = await this.loadToken(
        payload.id,
        createRefreshDto.isMovil,
      );

      if (!loadToken.status) {
        throw new UnauthorizedException('Expired Client, please login again');
      }
      if (token !== loadToken.token) {
        throw new UnauthorizedException('Old Token - Different Token');
      }
      if (createRefreshDto.clientUUID !== loadToken.clientUUID) {
        throw new UnauthorizedException('Old Client - Different Client');
      }
      if (payload.uuid !== loadToken.serverUUID) {
        throw new UnauthorizedException(
          'Old serverUUID - Different serverUUID',
        );
      }

      if (payload.isMovil !== createRefreshDto.isMovil) {
        throw new UnauthorizedException(
          'Platform mismatch - Different Platform',
        );
      }

      //Crear nuevo server UUID
      const newServerUUID = crypto.randomUUID();
      const newPayload = {
        ...payload,
        uuid: newServerUUID,
      };

      //Elimina los anteriores datos de payload

      delete newPayload.exp;
      delete newPayload.iat;

      const newToken = await this.jwToken.signAsync(newPayload);

      await this.saveDataToken(
        newServerUUID,
        newToken,
        payload.id,
        undefined,
        createRefreshDto.isMovil,
      );

      return {
        access_token: newToken,
      };
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  async saveDataToken(
    serverUUID: string,
    token: string,
    clientId: number,
    clientUUID?: string,
    isMovil?: boolean,
  ): Promise<boolean> {
    try {
      //Ruta o branch del guardado -> redis:Auth:1
      const brachName = `${this.prefix}:${isMovil ? this.branchMovilKey : this.branchKey}:${clientId}`;

      //Ruta o branch del guardado -> redis:Auth:1:serverUUID
      const serverUUIDKey = `${brachName}:serverUUID`;
      const tokenKey = `${brachName}:token`;
      const clientUUIDKey = `${brachName}:clientUUID`;

      //Guardar en Redis los datos cuando se inicie session
      await this.redis.setKey(
        serverUUIDKey,
        serverUUID,
        60 * 24 * 7 * 8, //60 min * 24 horas * 7 dias * 8 semanas
      );

      await this.redis.setKey(
        tokenKey,
        token,
        60 * 24 * 7 * 8, //60 min * 24 horas * 7 dias * 8 semanas
      );

      //Guardar el clientUUID solo si se proporciona al iniciar sesión, ya que es opcional y puede no estar presente en todas las solicitudes de inicio de sesión. Esto permite una mayor flexibilidad en la gestión de tokens y sesiones, especialmente en entornos donde el clientUUID puede no ser necesario o relevante.
      if (clientUUID) {
        await this.redis.setKey(
          clientUUIDKey,
          clientUUID,
          60 * 24 * 7 * 8, //60 min * 24 horas * 7 dias * 8 semanas
        );
      }

      //Meterlos en un mismo Branch para poder eliminarlos mas rápido
      await this.redis.addBranch(
        `${isMovil ? this.branchMovilKey : this.branchKey}:${clientId}`,
        serverUUIDKey,
      );
      await this.redis.addBranch(
        `${isMovil ? this.branchMovilKey : this.branchKey}:${clientId}`,
        tokenKey,
      );

      if (clientUUID) {
        await this.redis.addBranch(
          `${isMovil ? this.branchMovilKey : this.branchKey}:${clientId}`,
          clientUUIDKey,
        );
      }

      return true;
    } catch (error) {
      return false;
    }
  }

  async clearToken(clientId: number, isMovil?: boolean) {
    //Elimina la rama con el id de cliente
    try {
      await this.redis.deleteBranch(
        `${isMovil ? this.branchMovilKey : this.branchKey}:${clientId}`,
      );
      return true;
    } catch (error) {
      return false;
    }
  }

  // Carga los datos de Redis
  async loadToken(clientId: number, isMovil?: boolean) {
    //Ruta o branch del guardado -> redis:Auth:1
    const brachName = `${this.prefix}:${isMovil ? this.branchMovilKey : this.branchKey}:${clientId}`;

    const serverUUID = await this.redis.getKey(brachName + ':serverUUID');
    const token = await this.redis.getKey(brachName + ':token');
    const clientUUID = await this.redis.getKey(brachName + ':clientUUID');

    if (!serverUUID || !token || !clientUUID) {
      return { status: false };
    }

    return {
      status: true,
      serverUUID,
      token,
      clientUUID,
    };
  }

  async validateToken() {
    return { status: true };
  }
}
