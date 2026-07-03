import { Module, Global } from '@nestjs/common';
import Redis from 'ioredis';
import { RedisService } from './redis.service';
import 'dotenv/config';

@Global()
@Module({
  providers: [
    {
      provide: 'REDIS_CLIENT',
      useFactory: () => {
        const redis = new Redis({
          host: process.env.REDIS_HOST, // o usa process.env.REDIS_HOST
          password: process.env.REDIS_PASSWORD,
          port: process.env.REDIS_PORT ? +process.env.REDIS_PORT : 6379,
          db: 0,
        });
        return redis;
      },
    },
    RedisService,
  ],
  exports: [RedisService],
})
export class RedisModule {}
