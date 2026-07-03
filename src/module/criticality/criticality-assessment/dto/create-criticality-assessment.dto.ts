import { IsString, IsNumber } from 'class-validator';

export class CreateCriticalityAssessmentDto {
  @IsNumber()
  id: number;

  @IsString()
  critic_title: string;

  @IsNumber()
  critic_value: number;

  @IsString()
  medium_title: string;

  @IsNumber()
  medium_value: number;

  @IsString()
  low_title: string;

  @IsString()
  low_value: string;

  @IsNumber()
  analysesRulesId: number;
}