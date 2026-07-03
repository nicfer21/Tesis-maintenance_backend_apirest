import { IsNumber } from 'class-validator';

export class CreateCriticalityAssetMaintenanceDto {
  @IsNumber()
  id: number;

  @IsNumber()
  column1_value: number;

  @IsNumber()
  column2_value: number;

  @IsNumber()
  column3_value: number;

  @IsNumber()
  column4_value: number;

  @IsNumber()
  column5_value: number;

  @IsNumber()
  severity_value: number;

  @IsNumber()
  severity_sum: number;

  @IsNumber()
  frequency_value: number;

  @IsNumber()
  criticality_asset_value: number;

  @IsNumber()
  assetMaintenanceId: number;

  @IsNumber()
  analysesId: number;
}