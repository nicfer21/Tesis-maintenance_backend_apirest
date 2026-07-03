import { PartialType } from '@nestjs/mapped-types';
import { CreateFailureFrequencyDto } from './create-failure-frequency.dto';

export class UpdateFailureFrequencyDto extends PartialType(CreateFailureFrequencyDto) {}