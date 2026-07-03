import { IsString, IsOptional, IsJSON, IsNumber } from 'class-validator';

export class CreateSubsystemDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  code: string;

  @IsOptional()
  @IsJSON()
  metadata?: Record<string, any>;

  @IsOptional()
  @IsString()
  image?: string;

  @IsNumber()
  systemId: number;

}