import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';

@Injectable()
export class SectionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createSectionDto: CreateSectionDto) {
    return this.prisma.section.create({
      data: createSectionDto,
    });
  }

  async findAll() {
    return this.prisma.section.findMany();
  }

  async findOne(id: number) {
    return this.prisma.section.findUniqueOrThrow({
      where: { id },
    });
  }

  async update(id: number, updateSectionDto: UpdateSectionDto) {
    return this.prisma.section.update({
      where: { id },
      data: updateSectionDto,
    });
  }

  async remove(id: number) {
    return this.prisma.section.delete({
      where: { id },
    });
  }
}