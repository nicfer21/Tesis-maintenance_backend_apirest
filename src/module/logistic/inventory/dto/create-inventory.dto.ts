import { IsString, IsOptional, IsJSON, IsNumber } from 'class-validator';

export class CreateInventoryDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsJSON()
  metadata?: Record<string, any>;

  @IsOptional()
  @IsString()
  image?: string;

  @IsNumber()
  forUseId: number;

  @IsNumber()
  unitId: number;

  @IsNumber()
  modelId: number;

  @IsNumber()
  supplierId: number;

}