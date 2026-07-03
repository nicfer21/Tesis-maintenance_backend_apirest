import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { CreateOrderWorkerDto } from './dto/create-order-worker.dto';
import { UpdateOrderWorkerDto } from './dto/update-order-worker.dto';

@Injectable()
export class OrderWorkerService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createOrderWorkerDto: CreateOrderWorkerDto) {
    return this.prisma.order_worker.create({
      data: createOrderWorkerDto,
    });
  }

  async findAll() {
    return this.prisma.order_worker.findMany();
  }

  async findOne(id: number) {
    return this.prisma.order_worker.findUniqueOrThrow({
      where: { id },
    });
  }

  async update(id: number, updateOrderWorkerDto: UpdateOrderWorkerDto) {
    return this.prisma.order_worker.update({
      where: { id },
      data: updateOrderWorkerDto,
    });
  }

  async remove(id: number) {
    return this.prisma.order_worker.delete({
      where: { id },
    });
  }
}