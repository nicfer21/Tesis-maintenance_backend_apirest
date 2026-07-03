import { Module } from '@nestjs/common';
import { WorkerService } from './worker.service';
import { WorkerController } from './worker.controller';
import { SessionModule } from '../session/session.module';

@Module({
  controllers: [WorkerController],
  providers: [WorkerService],
  exports: [WorkerService],
  imports: [SessionModule],
})
export class WorkerModule {}
