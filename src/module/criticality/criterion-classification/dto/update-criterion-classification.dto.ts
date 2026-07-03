import { PartialType } from '@nestjs/mapped-types';
import { CreateCriterionClassificationDto } from './create-criterion-classification.dto';

export class UpdateCriterionClassificationDto extends PartialType(CreateCriterionClassificationDto) {}