import { IsString, IsOptional, IsJSON, IsNumber } from 'class-validator';

export class CreateInventoryComponentDto {
  @IsNumber()
  inventoryId: number;

  @IsNumber()
  componentId: number;

}