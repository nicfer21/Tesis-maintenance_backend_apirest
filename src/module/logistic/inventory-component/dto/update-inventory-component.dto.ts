import { PartialType } from '@nestjs/mapped-types';
import { CreateInventoryComponentDto } from './create-inventory-component.dto';

export class UpdateInventoryComponentDto extends PartialType(CreateInventoryComponentDto) {}