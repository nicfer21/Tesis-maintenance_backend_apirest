import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { CreateActivityInventoryDto } from './dto/create-activity-inventory.dto';
import { UpdateActivityInventoryDto } from './dto/update-activity-inventory.dto';

@Injectable()
export class ActivityInventoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createActivityInventoryDto: CreateActivityInventoryDto) {
    return this.prisma.activity_inventory.create({
      data: createActivityInventoryDto,
    });
  }

  async findAll() {
    return this.prisma.activity_inventory.findMany();
  }

  async findOne(id: number) {
    return this.prisma.activity_inventory.findUniqueOrThrow({
      where: { id },
    });
  }

  async update(id: number, updateActivityInventoryDto: UpdateActivityInventoryDto) {
    return this.prisma.activity_inventory.update({
      where: { id },
      data: updateActivityInventoryDto,
    });
  }

  async remove(id: number) {
    return this.prisma.activity_inventory.delete({
      where: { id },
    });
  }
}