import { PartialType } from '@nestjs/mapped-types';
import { CreateActivityInventoryDto } from './create-activity-inventory.dto';

export class UpdateActivityInventoryDto extends PartialType(CreateActivityInventoryDto) {}