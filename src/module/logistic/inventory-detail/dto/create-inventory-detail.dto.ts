import { IsNumber } from 'class-validator';

export class CreateInventoryDetailDto {
  @IsNumber()
  inventoryId: number;

  @IsNumber()
  quantity: number;

  @IsNumber()
  cost: number;
}