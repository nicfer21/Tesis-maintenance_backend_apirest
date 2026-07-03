import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateRefreshDto {
  @IsString()
  token: string;

  @IsOptional()
  @IsBoolean()
  isMovil?: boolean;

  @IsOptional()
  @IsString()
  clientUUID?: string;
}
