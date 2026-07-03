import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { CreateEntryDetailDto } from './dto/create-entry-detail.dto';
import { UpdateEntryDetailDto } from './dto/update-entry-detail.dto';

@Injectable()
export class EntryDetailService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createEntryDetailDto: CreateEntryDetailDto) {
    return this.prisma.entry_detail.create({
      data: createEntryDetailDto,
    });
  }

  async findAll() {
    return this.prisma.entry_detail.findMany();
  }

  async findOne(id: number) {
    return this.prisma.entry_detail.findUniqueOrThrow({
      where: { id },
    });
  }

  async update(id: number, updateEntryDetailDto: UpdateEntryDetailDto) {
    return this.prisma.entry_detail.update({
      where: { id },
      data: updateEntryDetailDto,
    });
  }

  async remove(id: number) {
    return this.prisma.entry_detail.delete({
      where: { id },
    });
  }
}