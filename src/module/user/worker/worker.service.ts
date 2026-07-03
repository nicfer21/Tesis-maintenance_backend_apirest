import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWorkerDto } from './dto/create-worker.dto';
import { UpdateWorkerDto } from './dto/update-worker.dto';
import { CreateAuthDto } from '../auth/dto/create-auth.dto';
import { encryptPassword } from '../../../common/handlers/encrypt.handler';
import { SessionService } from '../session/session.service';
import type { Request } from 'express';
import { getMetadataFromRequest } from '../../../common/handlers/metadata.handler';
import { CreateSessionDto } from '../session/dto/create-session.dto';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { RedisService } from '../../../common/redis/redis.service';

@Injectable()
export class WorkerService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly session: SessionService,
    private readonly redis: RedisService,
  ) {}

  private branchKey = 'Worker';

  async signIn(createAuthDto: CreateAuthDto, req: Request) {
    try {
      //Busca el usuario
      const res = await this.prisma.worker.findFirstOrThrow({
        where: {
          dni: createAuthDto.dni,
          status: true,
        },
        include: {
          credentials: {
            where: { password: encryptPassword(createAuthDto.password) },
          },
        },
      });

      //Busca una coincidencia
      if (res.credentials.length < 1) {
        return null;
      }

      //Obtiene metadatos
      const metadata = getMetadataFromRequest(req);

      const sessionData: CreateSessionDto = {
        workerId: res.id,
        metadata: metadata,
      };

      //Guarda la session
      await this.session.createSession(sessionData);

      return res;
    } catch (error) {
      //console.log(error);
      return null;
    }
  }

  async getAllActiveWorker() {
    try {
      const req = await this.redis.generalFunctionRedis(
        this.branchKey,
        'getAllActiveWorker',
        '',
        async () => {
          const req = await this.prisma.worker.findMany({
            where: {
              status: true,
            },
            orderBy: { createdAt: 'desc' },
          });
          return req;
        },
        10,
      );

      return req;
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async getAllWorker() {
    try {
      const req = this.redis.generalFunctionRedis(
        this.branchKey,
        'getAllWorker',
        '',
        async () => {
          const req = await this.prisma.worker.findMany({
            orderBy: { createdAt: 'desc' },
          });
          return req;
        },
        10,
      );

      return req;
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async getAllActiveWorkerSimp() {
    try {
      const req = await this.redis.generalFunctionRedis(
        this.branchKey,
        'getAllActiveWorkerSimp',
        '',
        async () => {
          const req = await this.prisma.worker.findMany({
            select: {
              id: true,
              firstname: true,
              lastname: true,
              worker_level: true,
            },
            where: {
              status: true,
            },
            orderBy: { createdAt: 'desc' },
          });
          return req;
        },
        10,
      );

      return req;
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async getOneProfile(workerId: number) {
    try {
      const req = this.redis.generalFunctionRedis(
        this.branchKey,
        'getOneProfile',
        `${workerId}`,
        async () => {
          const req = this.prisma.worker.findFirstOrThrow({
            where: {
              id: workerId,
            },
            include: {
              sessions: {
                orderBy: { createdAt: 'desc' },
                take: 10,
              },
            },
          });
          return req;
        },
        10,
      );
      return req;
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async createWorker() {
    return this.redis.deleteBranchBoolean(this.branchKey);
  }
}
