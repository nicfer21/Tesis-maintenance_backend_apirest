import { PartialType } from '@nestjs/mapped-types';
import { CreateCriterionSeverityDto } from './create-criterion-severity.dto';

export class UpdateCriterionSeverityDto extends PartialType(CreateCriterionSeverityDto) {}