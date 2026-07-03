import { IsNumber } from 'class-validator';

export class CreateEntryDetailDto {
  @IsNumber()
  entryId: number;

  @IsNumber()
  inventoryId: number;

  @IsNumber()
  quantity: number;

  @IsNumber()
  cost: number;
}