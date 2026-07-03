import { IsString, IsOptional, IsJSON, IsNumber, IsBoolean, IsDateString } from 'class-validator';

export class CreateAnalysesDto {
  @IsNumber()
  id: number;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsDateString()
  initAnalyses: Date;

  @IsDateString()
  endAnalyses: Date;

  @IsString()
  madeBy: string;

  @IsOptional()
  @IsBoolean()
  completed?: boolean;

  @IsNumber()
  analysesRulesId: number;
}