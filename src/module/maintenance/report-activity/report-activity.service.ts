import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { CreateReportActivityDto } from './dto/create-report-activity.dto';
import { UpdateReportActivityDto } from './dto/update-report-activity.dto';

@Injectable()
export class ReportActivityService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createReportActivityDto: CreateReportActivityDto) {
    return this.prisma.report_activity.create({
      data: createReportActivityDto,
    });
  }

  async findAll() {
    return this.prisma.report_activity.findMany();
  }

  async findOne(id: number) {
    return this.prisma.report_activity.findUniqueOrThrow({
      where: { id },
    });
  }

  async update(id: number, updateReportActivityDto: UpdateReportActivityDto) {
    return this.prisma.report_activity.update({
      where: { id },
      data: updateReportActivityDto,
    });
  }

  async remove(id: number) {
    return this.prisma.report_activity.delete({
      where: { id },
    });
  }
}