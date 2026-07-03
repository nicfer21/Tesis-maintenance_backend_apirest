import { IsString, IsOptional, IsJSON, IsNumber } from 'class-validator';

export class CreateComponentDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  code: string;

  @IsNumber()
  quantity: number;

  @IsOptional()
  @IsJSON()
  metadata?: Record<string, any>;

  @IsOptional()
  @IsString()
  image?: string;

  @IsNumber()
  asset_maintenanceId: number;
}