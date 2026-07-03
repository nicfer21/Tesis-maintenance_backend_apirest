import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';

@Injectable()
export class UnitService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUnitDto: CreateUnitDto) {
    return this.prisma.unit.create({
      data: createUnitDto,
    });
  }

  async findAll() {
    return this.prisma.unit.findMany();
  }

  async findOne(id: number) {
    return this.prisma.unit.findUniqueOrThrow({
      where: { id },
    });
  }

  async update(id: number, updateUnitDto: UpdateUnitDto) {
    return this.prisma.unit.update({
      where: { id },
      data: updateUnitDto,
    });
  }

  async remove(id: number) {
    return this.prisma.unit.delete({
      where: { id },
    });
  }
}