import { IsNumber } from 'class-validator';

export class CreateCriticalitySystemDto {
  @IsNumber()
  id: number;

  @IsNumber()
  value: number;

  @IsNumber()
  systemId: number;

  @IsNumber()
  analysesId: number;
}