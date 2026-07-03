import { PartialType } from '@nestjs/mapped-types';
import { CreateForUseDto } from './create-for-use.dto';

export class UpdateForUseDto extends PartialType(CreateForUseDto) {}