import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';

@Injectable()
export class ReportService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createReportDto: CreateReportDto) {
    return this.prisma.report.create({
      data: createReportDto,
    });
  }

  async findAll() {
    return this.prisma.report.findMany();
  }

  async findOne(id: number) {
    return this.prisma.report.findUniqueOrThrow({
      where: { id },
    });
  }

  async update(id: number, updateReportDto: UpdateReportDto) {
    return this.prisma.report.update({
      where: { id },
      data: updateReportDto,
    });
  }

  async remove(id: number) {
    return this.prisma.report.delete({
      where: { id },
    });
  }
}