import { Module } from '@nestjs/common';
import { ReportActivityInventoryService } from './report-activity-inventory.service';
import { ReportActivityInventoryController } from './report-activity-inventory.controller';
import { PrismaModule } from '../../../common/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ReportActivityInventoryController],
  providers: [ReportActivityInventoryService],
  exports: [ReportActivityInventoryService],
})
export class ReportActivityInventoryModule {}