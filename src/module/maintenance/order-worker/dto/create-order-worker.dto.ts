import { IsString, IsOptional, IsJSON, IsNumber } from 'class-validator';

export class CreateOrderWorkerDto {
  @IsNumber()
  orderId: number;

  @IsNumber()
  workerId: number;

}