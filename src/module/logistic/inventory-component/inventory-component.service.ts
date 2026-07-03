import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { CreateInventoryComponentDto } from './dto/create-inventory-component.dto';
import { UpdateInventoryComponentDto } from './dto/update-inventory-component.dto';

@Injectable()
export class InventoryComponentService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createInventoryComponentDto: CreateInventoryComponentDto) {
    return this.prisma.inventory_component.create({
      data: createInventoryComponentDto,
    });
  }

  async findAll() {
    return this.prisma.inventory_component.findMany();
  }

  async findOne(id: number) {
    return this.prisma.inventory_component.findUniqueOrThrow({
      where: { id },
    });
  }

  async update(id: number, updateInventoryComponentDto: UpdateInventoryComponentDto) {
    return this.prisma.inventory_component.update({
      where: { id },
      data: updateInventoryComponentDto,
    });
  }

  async remove(id: number) {
    return this.prisma.inventory_component.delete({
      where: { id },
    });
  }
}