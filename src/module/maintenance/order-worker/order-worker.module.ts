import { Module } from '@nestjs/common';
import { OrderWorkerService } from './order-worker.service';
import { OrderWorkerController } from './order-worker.controller';
import { PrismaModule } from '../../../common/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [OrderWorkerController],
  providers: [OrderWorkerService],
  exports: [OrderWorkerService],
})
export class OrderWorkerModule {}