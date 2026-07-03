import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { CreateFacilitiesDto } from './dto/create-facilities.dto';
import { UpdateFacilitiesDto } from './dto/update-facilities.dto';

@Injectable()
export class FacilitiesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createFacilitiesDto: CreateFacilitiesDto) {
    return this.prisma.facilities.create({
      data: createFacilitiesDto,
    });
  }

  async findAll() {
    return this.prisma.facilities.findMany();
  }

  async findOne(id: number) {
    return this.prisma.facilities.findUniqueOrThrow({
      where: { id },
    });
  }

  async update(id: number, updateFacilitiesDto: UpdateFacilitiesDto) {
    return this.prisma.facilities.update({
      where: { id },
      data: updateFacilitiesDto,
    });
  }

  async remove(id: number) {
    return this.prisma.facilities.delete({
      where: { id },
    });
  }
}