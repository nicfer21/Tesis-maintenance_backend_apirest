import { IsString, IsOptional, IsJSON, IsNumber, IsEnum } from 'class-validator';
import { obj_state } from '@prisma/client';

export class CreateAssetMaintenanceDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  principal_function: string;

  @IsString()
  code: string;

  @IsOptional()
  @IsJSON()
  benchmark?: Record<string, any>;

  @IsOptional()
  @IsJSON()
  metadata?: Record<string, any>;

  @IsOptional()
  @IsString()
  image?: string;

  @IsEnum(obj_state)
  state: obj_state;

  @IsNumber()
  subsystemId: number;
}