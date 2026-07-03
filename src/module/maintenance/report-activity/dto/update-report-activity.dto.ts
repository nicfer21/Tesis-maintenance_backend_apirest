import { PartialType } from '@nestjs/mapped-types';
import { CreateReportActivityDto } from './create-report-activity.dto';

export class UpdateReportActivityDto extends PartialType(CreateReportActivityDto) {}