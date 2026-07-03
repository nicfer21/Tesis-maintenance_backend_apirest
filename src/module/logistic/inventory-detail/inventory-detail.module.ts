import { Module } from '@nestjs/common';
import { InventoryDetailService } from './inventory-detail.service';
import { InventoryDetailController } from './inventory-detail.controller';
import { PrismaModule } from '../../../common/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [InventoryDetailController],
  providers: [InventoryDetailService],
  exports: [InventoryDetailService],
})
export class InventoryDetailModule {}