import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { CreateInventoryDetailDto } from './dto/create-inventory-detail.dto';
import { UpdateInventoryDetailDto } from './dto/update-inventory-detail.dto';

@Injectable()
export class InventoryDetailService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createInventoryDetailDto: CreateInventoryDetailDto) {
    return this.prisma.inventory_detail.create({
      data: createInventoryDetailDto,
    });
  }

  async findAll() {
    return this.prisma.inventory_detail.findMany();
  }

  async findOne(id: number) {
    return this.prisma.inventory_detail.findUniqueOrThrow({
      where: { id },
    });
  }

  async update(id: number, updateInventoryDetailDto: UpdateInventoryDetailDto) {
    return this.prisma.inventory_detail.update({
      where: { id },
      data: updateInventoryDetailDto,
    });
  }

  async remove(id: number) {
    return this.prisma.inventory_detail.delete({
      where: { id },
    });
  }
}