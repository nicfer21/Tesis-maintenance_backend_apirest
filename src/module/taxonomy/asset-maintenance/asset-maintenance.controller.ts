import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { AssetMaintenanceService } from './asset-maintenance.service';
import { CreateAssetMaintenanceDto } from './dto/create-asset-maintenance.dto';
import { UpdateAssetMaintenanceDto } from './dto/update-asset-maintenance.dto';

@Controller('asset-maintenance')
export class AssetMaintenanceController {
  constructor(private readonly assetMaintenanceService: AssetMaintenanceService) {}

  @Post()
  create(@Body() createAssetMaintenanceDto: CreateAssetMaintenanceDto) {
    return this.assetMaintenanceService.create(createAssetMaintenanceDto);
  }

  @Get()
  findAll() {
    return this.assetMaintenanceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.assetMaintenanceService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateAssetMaintenanceDto: UpdateAssetMaintenanceDto) {
    return this.assetMaintenanceService.update(id, updateAssetMaintenanceDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.assetMaintenanceService.remove(id);
  }
}