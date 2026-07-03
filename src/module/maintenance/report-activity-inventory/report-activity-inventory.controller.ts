import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ReportActivityInventoryService } from './report-activity-inventory.service';
import { CreateReportActivityInventoryDto } from './dto/create-report-activity-inventory.dto';
import { UpdateReportActivityInventoryDto } from './dto/update-report-activity-inventory.dto';

@Controller('report-activity-inventory')
export class ReportActivityInventoryController {
  constructor(private readonly reportActivityInventoryService: ReportActivityInventoryService) {}

  @Post()
  create(@Body() createReportActivityInventoryDto: CreateReportActivityInventoryDto) {
    return this.reportActivityInventoryService.create(createReportActivityInventoryDto);
  }

  @Get()
  findAll() {
    return this.reportActivityInventoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.reportActivityInventoryService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateReportActivityInventoryDto: UpdateReportActivityInventoryDto) {
    return this.reportActivityInventoryService.update(id, updateReportActivityInventoryDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.reportActivityInventoryService.remove(id);
  }
}