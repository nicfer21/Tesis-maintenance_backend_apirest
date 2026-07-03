import { Module } from '@nestjs/common';
import { AssetMaintenanceService } from './asset-maintenance.service';
import { AssetMaintenanceController } from './asset-maintenance.controller';
import { PrismaModule } from '../../../common/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AssetMaintenanceController],
  providers: [AssetMaintenanceService],
  exports: [AssetMaintenanceService],
})
export class AssetMaintenanceModule {}