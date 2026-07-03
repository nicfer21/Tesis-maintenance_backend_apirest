import { IsString, IsOptional, IsJSON, IsNumber, IsEnum, IsArray, IsBoolean, IsDateString } from 'class-validator';
import { request_priority } from '@prisma/client';
import { request_status } from '@prisma/client';

export class CreateRequestDto {
  @IsString()
  title: string;

  @IsString()
  code: string;

  @IsDateString()
  requestDate: Date;

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
  requestPriority: request_priority;

  @IsEnum(request_status)
  requestStatus: request_status;

  @IsOptional()
  @IsBoolean()
  approved?: boolean;

  @IsNumber()
  workerId: number;

  @IsNumber()
  systemId: number;
}