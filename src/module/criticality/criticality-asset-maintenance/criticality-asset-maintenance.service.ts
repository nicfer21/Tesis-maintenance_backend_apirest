import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { CreateCriticalityAssetMaintenanceDto } from './dto/create-criticality-asset-maintenance.dto';
import { UpdateCriticalityAssetMaintenanceDto } from './dto/update-criticality-asset-maintenance.dto';

@Injectable()
export class CriticalityAssetMaintenanceService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCriticalityAssetMaintenanceDto: CreateCriticalityAssetMaintenanceDto) {
    return this.prisma.criticality_asset_maintenance.create({
      data: createCriticalityAssetMaintenanceDto,
    });
  }

  async findAll() {
    return this.prisma.criticality_asset_maintenance.findMany();
  }

  async findOne(id: number) {
    return this.prisma.criticality_asset_maintenance.findUniqueOrThrow({
      where: { id },
    });
  }

  async update(id: number, updateCriticalityAssetMaintenanceDto: UpdateCriticalityAssetMaintenanceDto) {
    return this.prisma.criticality_asset_maintenance.update({
      where: { id },
      data: updateCriticalityAssetMaintenanceDto,
    });
  }

  async remove(id: number) {
    return this.prisma.criticality_asset_maintenance.delete({
      where: { id },
    });
  }
}