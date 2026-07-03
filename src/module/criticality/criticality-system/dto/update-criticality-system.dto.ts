import { PartialType } from '@nestjs/mapped-types';
import { CreateCriticalitySystemDto } from './create-criticality-system.dto';

export class UpdateCriticalitySystemDto extends PartialType(CreateCriticalitySystemDto) {}