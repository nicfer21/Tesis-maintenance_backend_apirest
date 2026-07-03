import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { CreateComponentDto } from './dto/create-component.dto';
import { UpdateComponentDto } from './dto/update-component.dto';

@Injectable()
export class ComponentService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createComponentDto: CreateComponentDto) {
    return this.prisma.component.create({
      data: createComponentDto,
    });
  }

  async findAll() {
    return this.prisma.component.findMany();
  }

  async findOne(id: number) {
    return this.prisma.component.findUniqueOrThrow({
      where: { id },
    });
  }

  async update(id: number, updateComponentDto: UpdateComponentDto) {
    return this.prisma.component.update({
      where: { id },
      data: updateComponentDto,
    });
  }

  async remove(id: number) {
    return this.prisma.component.delete({
      where: { id },
    });
  }
}