import { IsString, IsOptional, IsJSON, IsNumber } from 'class-validator';

export class CreateReportActivityDto {
  @IsNumber()
  reportId: number;

  @IsNumber()
  activityId: number;

  @IsNumber()
  activityNumber: number;
}
