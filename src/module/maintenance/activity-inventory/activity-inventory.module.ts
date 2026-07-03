import { Module } from '@nestjs/common';
import { ActivityInventoryService } from './activity-inventory.service';
import { ActivityInventoryController } from './activity-inventory.controller';
import { PrismaModule } from '../../../common/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ActivityInventoryController],
  providers: [ActivityInventoryService],
  exports: [ActivityInventoryService],
})
export class ActivityInventoryModule {}