import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';

@Injectable()
export class ActivityService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createActivityDto: CreateActivityDto) {
    return this.prisma.activity.create({
      data: createActivityDto,
    });
  }

  async findAll() {
    return this.prisma.activity.findMany();
  }

  async findOne(id: number) {
    return this.prisma.activity.findUniqueOrThrow({
      where: { id },
    });
  }

  async update(id: number, updateActivityDto: UpdateActivityDto) {
    return this.prisma.activity.update({
      where: { id },
      data: updateActivityDto,
    });
  }

  async remove(id: number) {
    return this.prisma.activity.delete({
      where: { id },
    });
  }
}