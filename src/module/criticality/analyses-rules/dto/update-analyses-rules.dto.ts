import { PartialType } from '@nestjs/mapped-types';
import { CreateAnalysesRulesDto } from './create-analyses-rules.dto';

export class UpdateAnalysesRulesDto extends PartialType(CreateAnalysesRulesDto) {}