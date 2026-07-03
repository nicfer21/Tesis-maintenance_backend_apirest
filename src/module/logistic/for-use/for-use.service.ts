import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { CreateForUseDto } from './dto/create-for-use.dto';
import { UpdateForUseDto } from './dto/update-for-use.dto';

@Injectable()
export class ForUseService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createForUseDto: CreateForUseDto) {
    return this.prisma.for_use.create({
      data: createForUseDto,
    });
  }

  async findAll() {
    return this.prisma.for_use.findMany();
  }

  async findOne(id: number) {
    return this.prisma.for_use.findUniqueOrThrow({
      where: { id },
    });
  }

  async update(id: number, updateForUseDto: UpdateForUseDto) {
    return this.prisma.for_use.update({
      where: { id },
      data: updateForUseDto,
    });
  }

  async remove(id: number) {
    return this.prisma.for_use.delete({
      where: { id },
    });
  }
}
