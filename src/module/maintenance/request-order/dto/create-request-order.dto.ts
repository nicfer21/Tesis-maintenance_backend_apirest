import { IsString, IsOptional, IsJSON, IsNumber } from 'class-validator';

export class CreateRequestOrderDto {
  @IsNumber()
  requestId: number;

  @IsNumber()
  orderId: number;

}