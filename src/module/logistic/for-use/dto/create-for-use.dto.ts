import { IsString, IsOptional, IsNumber, IsEnum } from 'class-validator';
import { usage_type } from '@prisma/client';

export class CreateForUseDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsEnum(usage_type)
  usage_type: usage_type;
}