import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { CreateRequestOrderDto } from './dto/create-request-order.dto';
import { UpdateRequestOrderDto } from './dto/update-request-order.dto';

@Injectable()
export class RequestOrderService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createRequestOrderDto: CreateRequestOrderDto) {
    return this.prisma.request_order.create({
      data: createRequestOrderDto,
    });
  }

  async findAll() {
    return this.prisma.request_order.findMany();
  }

  async findOne(id: number) {
    return this.prisma.request_order.findUniqueOrThrow({
      where: { id },
    });
  }

  async update(id: number, updateRequestOrderDto: UpdateRequestOrderDto) {
    return this.prisma.request_order.update({
      where: { id },
      data: updateRequestOrderDto,
    });
  }

  async remove(id: number) {
    return this.prisma.request_order.delete({
      where: { id },
    });
  }
}