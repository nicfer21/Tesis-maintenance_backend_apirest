import { IsString, IsOptional, IsJSON, IsNumber } from 'class-validator';

export class CreateCredentialDto {
  @IsString()
  password: string;

  @IsNumber()
  workerId: number;

}