import { IsNumber } from 'class-validator';

export class CreateOrderActivityDto {
  @IsNumber()
  orderId: number;

  @IsNumber()
  activityId: number;

  @IsNumber()
  activityNumber: number;
}