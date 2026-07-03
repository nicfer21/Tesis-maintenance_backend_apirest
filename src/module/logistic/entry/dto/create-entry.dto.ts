import { IsString, IsJSON, IsDateString } from 'class-validator';

export class CreateEntryDto {
  @IsDateString()
  entryDate: Date;

  @IsString()
  document: string;

  @IsJSON()
  metadata: Record<string, any>;
}