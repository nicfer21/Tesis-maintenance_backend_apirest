import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { CriticalityAssetMaintenanceService } from './criticality-asset-maintenance.service';
import { CreateCriticalityAssetMaintenanceDto } from './dto/create-criticality-asset-maintenance.dto';
import { UpdateCriticalityAssetMaintenanceDto } from './dto/update-criticality-asset-maintenance.dto';

@Controller('criticality-asset-maintenance')
export class CriticalityAssetMaintenanceController {
  constructor(private readonly criticalityAssetMaintenanceService: CriticalityAssetMaintenanceService) {}

  @Post()
  create(@Body() createCriticalityAssetMaintenanceDto: CreateCriticalityAssetMaintenanceDto) {
    return this.criticalityAssetMaintenanceService.create(createCriticalityAssetMaintenanceDto);
  }

  @Get()
  findAll() {
    return this.criticalityAssetMaintenanceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.criticalityAssetMaintenanceService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateCriticalityAssetMaintenanceDto: UpdateCriticalityAssetMaintenanceDto) {
    return this.criticalityAssetMaintenanceService.update(id, updateCriticalityAssetMaintenanceDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.criticalityAssetMaintenanceService.remove(id);
  }
}