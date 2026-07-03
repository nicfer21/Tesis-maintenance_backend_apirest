import { Module } from '@nestjs/common';
import { RequestOrderService } from './request-order.service';
import { RequestOrderController } from './request-order.controller';
import { PrismaModule } from '../../../common/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [RequestOrderController],
  providers: [RequestOrderService],
  exports: [RequestOrderService],
})
export class RequestOrderModule {}