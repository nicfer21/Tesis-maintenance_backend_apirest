import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { CreateIndustryDto } from './dto/create-industry.dto';
import { UpdateIndustryDto } from './dto/update-industry.dto';

@Injectable()
export class IndustryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createIndustryDto: CreateIndustryDto) {
    return this.prisma.industry.create({
      data: createIndustryDto,
    });
  }

  async findAll() {
    return this.prisma.industry.findMany();
  }

  async findOne(id: number) {
    return this.prisma.industry.findUniqueOrThrow({
      where: { id },
    });
  }

  async update(id: number, updateIndustryDto: UpdateIndustryDto) {
    return this.prisma.industry.update({
      where: { id },
      data: updateIndustryDto,
    });
  }

  async remove(id: number) {
    return this.prisma.industry.delete({
      where: { id },
    });
  }
}