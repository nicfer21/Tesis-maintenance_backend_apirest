import { IsString, IsOptional, IsJSON, IsNumber } from 'class-validator';

export class CreateFacilitiesDto {
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
  business_categoryId: number;
}