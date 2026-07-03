import { IsString, IsOptional, IsJSON, IsNumber, IsArray, IsBoolean, IsDateString } from 'class-validator';

export class CreateReportDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsDateString()
  initReport: Date;

  @IsDateString()
  finishReport: Date;

  @IsNumber()
  handWorkTime: number;

  @IsNumber()
  durationReport: number;

  @IsOptional()
  @IsBoolean()
  approved?: boolean;

  @IsArray()
  @IsString({ each: true })
  image: string[];

  @IsArray()
  @IsString({ each: true })
  documentation: string[];

  @IsNumber()
  totalCost: number;

  @IsJSON()
  metadata: Record<string, any>;

  @IsNumber()
  orderId: number;
}