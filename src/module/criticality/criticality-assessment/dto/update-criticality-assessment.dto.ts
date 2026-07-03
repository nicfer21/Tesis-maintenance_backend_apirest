import { PartialType } from '@nestjs/mapped-types';
import { CreateCriticalityAssessmentDto } from './create-criticality-assessment.dto';

export class UpdateCriticalityAssessmentDto extends PartialType(CreateCriticalityAssessmentDto) {}