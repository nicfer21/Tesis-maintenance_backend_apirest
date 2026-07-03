import { IsNumber, IsOptional, IsJSON } from 'class-validator';

export class CreateSessionDto {
  @IsNumber()
  workerId: number;

  @IsOptional()
  @IsJSON()
  metadata?: Record<string, any>;
}
