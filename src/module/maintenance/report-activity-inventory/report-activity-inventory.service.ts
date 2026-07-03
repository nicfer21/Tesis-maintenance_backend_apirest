import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { CreateReportActivityInventoryDto } from './dto/create-report-activity-inventory.dto';
import { UpdateReportActivityInventoryDto } from './dto/update-report-activity-inventory.dto';

@Injectable()
export class ReportActivityInventoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createReportActivityInventoryDto: CreateReportActivityInventoryDto) {
    return this.prisma.report_activity_inventory.create({
      data: createReportActivityInventoryDto,
    });
  }

  async findAll() {
    return this.prisma.report_activity_inventory.findMany();
  }

  async findOne(id: number) {
    return this.prisma.report_activity_inventory.findUniqueOrThrow({
      where: { id },
    });
  }

  async update(id: number, updateReportActivityInventoryDto: UpdateReportActivityInventoryDto) {
    return this.prisma.report_activity_inventory.update({
      where: { id },
      data: updateReportActivityInventoryDto,
    });
  }

  async remove(id: number) {
    return this.prisma.report_activity_inventory.delete({
      where: { id },
    });
  }
}