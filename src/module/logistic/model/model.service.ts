import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { CreateModelDto } from './dto/create-model.dto';
import { UpdateModelDto } from './dto/update-model.dto';

@Injectable()
export class ModelService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createModelDto: CreateModelDto) {
    return this.prisma.model.create({
      data: createModelDto,
    });
  }

  async findAll() {
    return this.prisma.model.findMany();
  }

  async findOne(id: number) {
    return this.prisma.model.findUniqueOrThrow({
      where: { id },
    });
  }

  async update(id: number, updateModelDto: UpdateModelDto) {
    return this.prisma.model.update({
      where: { id },
      data: updateModelDto,
    });
  }

  async remove(id: number) {
    return this.prisma.model.delete({
      where: { id },
    });
  }
}