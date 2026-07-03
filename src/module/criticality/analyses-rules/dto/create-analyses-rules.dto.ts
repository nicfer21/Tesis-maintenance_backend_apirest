import { IsString, IsNumber } from 'class-validator';

export class CreateAnalysesRulesDto {
  @IsNumber()
  id: number;

  @IsString()
  title: string;

  @IsNumber()
  workerId: number;
}