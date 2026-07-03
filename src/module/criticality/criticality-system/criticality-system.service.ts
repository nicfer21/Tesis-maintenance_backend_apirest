import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { CreateCriticalitySystemDto } from './dto/create-criticality-system.dto';
import { UpdateCriticalitySystemDto } from './dto/update-criticality-system.dto';

@Injectable()
export class CriticalitySystemService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCriticalitySystemDto: CreateCriticalitySystemDto) {
    return this.prisma.criticality_system.create({
      data: createCriticalitySystemDto,
    });
  }

  async findAll() {
    return this.prisma.criticality_system.findMany();
  }

  async findOne(id: number) {
    return this.prisma.criticality_system.findUniqueOrThrow({
      where: { id },
    });
  }

  async update(id: number, updateCriticalitySystemDto: UpdateCriticalitySystemDto) {
    return this.prisma.criticality_system.update({
      where: { id },
      data: updateCriticalitySystemDto,
    });
  }

  async remove(id: number) {
    return this.prisma.criticality_system.delete({
      where: { id },
    });
  }
}