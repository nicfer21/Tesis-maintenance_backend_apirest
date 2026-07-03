import { Module } from '@nestjs/common';
import { CriticalityAssetMaintenanceService } from './criticality-asset-maintenance.service';
import { CriticalityAssetMaintenanceController } from './criticality-asset-maintenance.controller';
import { PrismaModule } from '../../../common/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CriticalityAssetMaintenanceController],
  providers: [CriticalityAssetMaintenanceService],
  exports: [CriticalityAssetMaintenanceService],
})
export class CriticalityAssetMaintenanceModule {}