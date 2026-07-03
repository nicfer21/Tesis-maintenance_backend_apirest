import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { CreateAnalysesDto } from './dto/create-analyses.dto';
import { UpdateAnalysesDto } from './dto/update-analyses.dto';

@Injectable()
export class AnalysesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createAnalysesDto: CreateAnalysesDto) {
    return this.prisma.analyses.create({
      data: createAnalysesDto,
    });
  }

  async findAll() {
    return this.prisma.analyses.findMany();
  }

  async findOne(id: number) {
    return this.prisma.analyses.findUniqueOrThrow({
      where: { id },
    });
  }

  async update(id: number, updateAnalysesDto: UpdateAnalysesDto) {
    return this.prisma.analyses.update({
      where: { id },
      data: updateAnalysesDto,
    });
  }

  async remove(id: number) {
    return this.prisma.analyses.delete({
      where: { id },
    });
  }
}