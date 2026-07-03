import { IsString, IsNumber } from 'class-validator';

export class CreateCriterionClassificationDto {
  @IsNumber()
  id: number;

  @IsString()
  title: string;

  @IsNumber()
  columnNumber: number;

  @IsNumber()
  value: number;

  @IsNumber()
  criterionSeverityId: number;
}