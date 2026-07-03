import {
  IsString,
  IsOptional,
  IsJSON,
  IsNumber,
  IsDecimal,
} from 'class-validator';

export class CreateReportActivityInventoryDto {
  @IsNumber()
  reportActivityId: number;

  @IsNumber()
  inventoryId: number;

  @IsNumber()
  quantity: number;

  @IsDecimal()
  subtotalCost: number;
}
