import {
  IsString,
  IsOptional,
  IsJSON,
  IsNumber,
  IsEnum,
  IsArray,
  IsDateString,
} from 'class-validator';
import { request_priority } from '@prisma/client';
import { request_status } from '@prisma/client';
import { JsonValue } from '@prisma/client/runtime/client';

export class CreateOrderDto {
  @IsString()
  title: string;

  @IsString()
  code: string;

  @IsDateString()
  orderDate: Date;

  @IsString()
  description: string;

  @IsOptional()
  @IsJSON()
  metadata?: Record<string, any>;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  image?: string[];

  @IsEnum(request_priority)
  orderPriority: request_priority;

  @IsEnum(request_status)
  orderStatus: request_status;

  @IsNumber()
  workerId: number;

  @IsNumber()
  systemId: number;
}
