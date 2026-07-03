import { IsString, IsOptional, IsJSON, IsEnum } from 'class-validator';
import { WorkerLevel } from '@prisma/client';

export class CreateWorkerDto {
  @IsString()
  firstname: string;

  @IsString()
  lastname: string;

  @IsString()
  dni: string;

  @IsString()
  ruc: string;

  @IsString()
  email: string;

  @IsString()
  phone: string;

  @IsEnum(WorkerLevel)
  worker_level: WorkerLevel;

  @IsOptional()
  @IsJSON()
  metadata?: Record<string, any>;

  @IsOptional()
  @IsString()
  image?: string;
}
