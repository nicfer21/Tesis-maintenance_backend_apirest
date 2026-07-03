import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { CreateCriticalityAssessmentDto } from './dto/create-criticality-assessment.dto';
import { UpdateCriticalityAssessmentDto } from './dto/update-criticality-assessment.dto';

@Injectable()
export class CriticalityAssessmentService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCriticalityAssessmentDto: CreateCriticalityAssessmentDto) {
    return this.prisma.criticality_assessment.create({
      data: createCriticalityAssessmentDto,
    });
  }

  async findAll() {
    return this.prisma.criticality_assessment.findMany();
  }

  async findOne(id: number) {
    return this.prisma.criticality_assessment.findUniqueOrThrow({
      where: { id },
    });
  }

  async update(id: number, updateCriticalityAssessmentDto: UpdateCriticalityAssessmentDto) {
    return this.prisma.criticality_assessment.update({
      where: { id },
      data: updateCriticalityAssessmentDto,
    });
  }

  async remove(id: number) {
    return this.prisma.criticality_assessment.delete({
      where: { id },
    });
  }
}