import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { CreateCriterionClassificationDto } from './dto/create-criterion-classification.dto';
import { UpdateCriterionClassificationDto } from './dto/update-criterion-classification.dto';

@Injectable()
export class CriterionClassificationService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCriterionClassificationDto: CreateCriterionClassificationDto) {
    return this.prisma.criterion_classification.create({
      data: createCriterionClassificationDto,
    });
  }

  async findAll() {
    return this.prisma.criterion_classification.findMany();
  }

  async findOne(id: number) {
    return this.prisma.criterion_classification.findUniqueOrThrow({
      where: { id },
    });
  }

  async update(id: number, updateCriterionClassificationDto: UpdateCriterionClassificationDto) {
    return this.prisma.criterion_classification.update({
      where: { id },
      data: updateCriterionClassificationDto,
    });
  }

  async remove(id: number) {
    return this.prisma.criterion_classification.delete({
      where: { id },
    });
  }
}