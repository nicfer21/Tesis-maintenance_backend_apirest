import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderActivityDto } from './create-order-activity.dto';

export class UpdateOrderActivityDto extends PartialType(CreateOrderActivityDto) {}