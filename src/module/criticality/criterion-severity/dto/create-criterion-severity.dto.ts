import { IsString, IsNumber } from 'class-validator';

export class CreateCriterionSeverityDto {
  @IsNumber()
  id: number;

  @IsString()
  column1: string;

  @IsString()
  column2: string;

  @IsString()
  column3: string;

  @IsString()
  column4: string;

  @IsString()
  column5: string;

  @IsNumber()
  analysesRulesId: number;
}