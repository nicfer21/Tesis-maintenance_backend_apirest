import { PartialType } from '@nestjs/mapped-types';
import { CreateCriticalityAssetMaintenanceDto } from './create-criticality-asset-maintenance.dto';

export class UpdateCriticalityAssetMaintenanceDto extends PartialType(CreateCriticalityAssetMaintenanceDto) {}