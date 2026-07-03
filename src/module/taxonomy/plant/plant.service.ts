import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { CreatePlantDto } from './dto/create-plant.dto';
import { UpdatePlantDto } from './dto/update-plant.dto';

@Injectable()
export class PlantService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPlantDto: CreatePlantDto) {
    return this.prisma.plant.create({
      data: createPlantDto,
    });
  }

  async findAll() {
    return this.prisma.plant.findMany();
  }

  async findOne(id: number) {
    return this.prisma.plant.findUniqueOrThrow({
      where: { id },
    });
  }

  async update(id: number, updatePlantDto: UpdatePlantDto) {
    return this.prisma.plant.update({
      where: { id },
      data: updatePlantDto,
    });
  }

  async remove(id: number) {
    return this.prisma.plant.delete({
      where: { id },
    });
  }
}