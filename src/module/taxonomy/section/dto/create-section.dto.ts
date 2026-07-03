import { IsString, IsOptional, IsJSON, IsNumber } from 'class-validator';

export class CreateSectionDto {
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
  plantId: number;
}