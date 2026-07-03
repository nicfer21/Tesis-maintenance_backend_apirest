import { IsString, IsJSON, IsNumber, IsEnum, IsArray } from 'class-validator';
import { strategy } from '@prisma/client';

export class CreateActivityDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsEnum(strategy)
  strategy: strategy;

  @IsNumber()
  duration: number;

  @IsJSON()
  steps: Record<string, any>;

  @IsJSON()
  metadata: Record<string, any>;

  @IsArray()
  @IsString({ each: true })
  image: string[];

  @IsArray()
  @IsString({ each: true })
  documentation: string[];

  @IsNumber()
  estimatedCost: number;

  @IsNumber()
  assetMaintenanceId: number;
}