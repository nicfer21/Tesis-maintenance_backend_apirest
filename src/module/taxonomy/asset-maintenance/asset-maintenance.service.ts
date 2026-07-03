import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { CreateAssetMaintenanceDto } from './dto/create-asset-maintenance.dto';
import { UpdateAssetMaintenanceDto } from './dto/update-asset-maintenance.dto';

@Injectable()
export class AssetMaintenanceService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createAssetMaintenanceDto: CreateAssetMaintenanceDto) {
    return this.prisma.asset_maintenance.create({
      data: createAssetMaintenanceDto,
    });
  }

  async findAll() {
    return this.prisma.asset_maintenance.findMany();
  }

  async findOne(id: number) {
    return this.prisma.asset_maintenance.findUniqueOrThrow({
      where: { id },
    });
  }

  async update(id: number, updateAssetMaintenanceDto: UpdateAssetMaintenanceDto) {
    return this.prisma.asset_maintenance.update({
      where: { id },
      data: updateAssetMaintenanceDto,
    });
  }

  async remove(id: number) {
    return this.prisma.asset_maintenance.delete({
      where: { id },
    });
  }
}