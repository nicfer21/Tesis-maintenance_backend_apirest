import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { CreateBusinessCategoryDto } from './dto/create-business-category.dto';
import { UpdateBusinessCategoryDto } from './dto/update-business-category.dto';

@Injectable()
export class BusinessCategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createBusinessCategoryDto: CreateBusinessCategoryDto) {
    return this.prisma.business_category.create({
      data: createBusinessCategoryDto,
    });
  }

  async findAll() {
    return this.prisma.business_category.findMany();
  }

  async findOne(id: number) {
    return this.prisma.business_category.findUniqueOrThrow({
      where: { id },
    });
  }

  async update(id: number, updateBusinessCategoryDto: UpdateBusinessCategoryDto) {
    return this.prisma.business_category.update({
      where: { id },
      data: updateBusinessCategoryDto,
    });
  }

  async remove(id: number) {
    return this.prisma.business_category.delete({
      where: { id },
    });
  }
}