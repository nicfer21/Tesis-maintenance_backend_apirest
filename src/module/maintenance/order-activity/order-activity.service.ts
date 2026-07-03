import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { CreateOrderActivityDto } from './dto/create-order-activity.dto';
import { UpdateOrderActivityDto } from './dto/update-order-activity.dto';

@Injectable()
export class OrderActivityService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createOrderActivityDto: CreateOrderActivityDto) {
    return this.prisma.order_activity.create({
      data: createOrderActivityDto,
    });
  }

  async findAll() {
    return this.prisma.order_activity.findMany();
  }

  async findOne(id: number) {
    return this.prisma.order_activity.findUniqueOrThrow({
      where: { id },
    });
  }

  async update(id: number, updateOrderActivityDto: UpdateOrderActivityDto) {
    return this.prisma.order_activity.update({
      where: { id },
      data: updateOrderActivityDto,
    });
  }

  async remove(id: number) {
    return this.prisma.order_activity.delete({
      where: { id },
    });
  }
}