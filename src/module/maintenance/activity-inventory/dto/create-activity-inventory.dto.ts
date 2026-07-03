import { IsNumber } from 'class-validator';

export class CreateActivityInventoryDto {
  @IsNumber()
  activityId: number;

  @IsNumber()
  inventoryId: number;

  @IsNumber()
  quantity: number;

  @IsNumber()
  subtotalCost: number;
}