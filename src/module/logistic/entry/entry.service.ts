import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { CreateEntryDto } from './dto/create-entry.dto';
import { UpdateEntryDto } from './dto/update-entry.dto';

@Injectable()
export class EntryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createEntryDto: CreateEntryDto) {
    return this.prisma.entry.create({
      data: createEntryDto,
    });
  }

  async findAll() {
    return this.prisma.entry.findMany();
  }

  async findOne(id: number) {
    return this.prisma.entry.findUniqueOrThrow({
      where: { id },
    });
  }

  async update(id: number, updateEntryDto: UpdateEntryDto) {
    return this.prisma.entry.update({
      where: { id },
      data: updateEntryDto,
    });
  }

  async remove(id: number) {
    return this.prisma.entry.delete({
      where: { id },
    });
  }
}