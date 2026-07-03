import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { CreateCriterionSeverityDto } from './dto/create-criterion-severity.dto';
import { UpdateCriterionSeverityDto } from './dto/update-criterion-severity.dto';

@Injectable()
export class CriterionSeverityService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCriterionSeverityDto: CreateCriterionSeverityDto) {
    return this.prisma.criterion_severity.create({
      data: createCriterionSeverityDto,
    });
  }

  async findAll() {
    return this.prisma.criterion_severity.findMany();
  }

  async findOne(id: number) {
    return this.prisma.criterion_severity.findUniqueOrThrow({
      where: { id },
    });
  }

  async update(id: number, updateCriterionSeverityDto: UpdateCriterionSeverityDto) {
    return this.prisma.criterion_severity.update({
      where: { id },
      data: updateCriterionSeverityDto,
    });
  }

  async remove(id: number) {
    return this.prisma.criterion_severity.delete({
      where: { id },
    });
  }
}