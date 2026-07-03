import { IsString, IsNumber } from 'class-validator';

export class CreateFailureFrequencyDto {
  @IsNumber()
  id: number;

  @IsString()
  title: string;

  @IsNumber()
  mtbfLimit: number;

  @IsNumber()
  value: number;

  @IsNumber()
  analysesRulesId: number;
}