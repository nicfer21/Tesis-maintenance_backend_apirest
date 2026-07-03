import { PartialType } from '@nestjs/mapped-types';
import { CreateReportActivityInventoryDto } from './create-report-activity-inventory.dto';

export class UpdateReportActivityInventoryDto extends PartialType(CreateReportActivityInventoryDto) {}