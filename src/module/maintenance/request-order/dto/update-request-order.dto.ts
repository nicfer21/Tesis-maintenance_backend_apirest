import { PartialType } from '@nestjs/mapped-types';
import { CreateRequestOrderDto } from './create-request-order.dto';

export class UpdateRequestOrderDto extends PartialType(CreateRequestOrderDto) {}