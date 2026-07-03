import { Module } from '@nestjs/common';
import { OrderActivityService } from './order-activity.service';
import { OrderActivityController } from './order-activity.controller';
import { PrismaModule } from '../../../common/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [OrderActivityController],
  providers: [OrderActivityService],
  exports: [OrderActivityService],
})
export class OrderActivityModule {}