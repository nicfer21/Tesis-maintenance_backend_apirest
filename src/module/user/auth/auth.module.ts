import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { WorkerModule } from '../worker/worker.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    WorkerModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWTWORD,
      signOptions: { expiresIn: '60s' },
    }),
  ],
})
export class AuthModule {}
