import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateAuthDto {
  @IsString()
  dni: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  clientUUID?: string;

  @IsOptional()
  @IsBoolean()
  isMovil?: boolean;
}
