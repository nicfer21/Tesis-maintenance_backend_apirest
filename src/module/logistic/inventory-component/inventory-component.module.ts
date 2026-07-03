import { Module } from '@nestjs/common';
import { InventoryComponentService } from './inventory-component.service';
import { InventoryComponentController } from './inventory-component.controller';
import { PrismaModule } from '../../../common/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [InventoryComponentController],
  providers: [InventoryComponentService],
  exports: [InventoryComponentService],
})
export class InventoryComponentModule {}