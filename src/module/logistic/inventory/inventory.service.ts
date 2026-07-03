import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';

@Injectable()
export class InventoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createInventoryDto: CreateInventoryDto) {
    return this.prisma.inventory.create({
      data: createInventoryDto,
    });
  }

  async findAll() {
    return this.prisma.inventory.findMany();
  }

  async findOne(id: number) {
    return this.prisma.inventory.findUniqueOrThrow({
      where: { id },
    });
  }

  async update(id: number, updateInventoryDto: UpdateInventoryDto) {
    return this.prisma.inventory.update({
      where: { id },
      data: updateInventoryDto,
    });
  }

  async remove(id: number) {
    return this.prisma.inventory.delete({
      where: { id },
    });
  }
}