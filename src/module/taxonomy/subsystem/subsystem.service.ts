import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { CreateSubsystemDto } from './dto/create-subsystem.dto';
import { UpdateSubsystemDto } from './dto/update-subsystem.dto';

@Injectable()
export class SubsystemService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createSubsystemDto: CreateSubsystemDto) {
    return this.prisma.subsystem.create({
      data: createSubsystemDto,
    });
  }

  async findAll() {
    return this.prisma.subsystem.findMany();
  }

  async findOne(id: number) {
    return this.prisma.subsystem.findUniqueOrThrow({
      where: { id },
    });
  }

  async update(id: number, updateSubsystemDto: UpdateSubsystemDto) {
    return this.prisma.subsystem.update({
      where: { id },
      data: updateSubsystemDto,
    });
  }

  async remove(id: number) {
    return this.prisma.subsystem.delete({
      where: { id },
    });
  }
}