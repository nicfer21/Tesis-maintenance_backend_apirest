import { IsString, IsOptional, IsJSON, IsNumber } from 'class-validator';

export class CreateUnitDto {
  @IsString()
  name: string;

}