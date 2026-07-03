import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { CreateSystemDto } from './dto/create-system.dto';
import { UpdateSystemDto } from './dto/update-system.dto';

@Injectable()
export class SystemService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createSystemDto: CreateSystemDto) {
    return this.prisma.system.create({
      data: createSystemDto,
    });
  }

  async findAll() {
    return this.prisma.system.findMany();
  }

  async findOne(id: number) {
    return this.prisma.system.findUniqueOrThrow({
      where: { id },
    });
  }

  async update(id: number, updateSystemDto: UpdateSystemDto) {
    return this.prisma.system.update({
      where: { id },
      data: updateSystemDto,
    });
  }

  async remove(id: number) {
    return this.prisma.system.delete({
      where: { id },
    });
  }
}