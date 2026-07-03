import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ReportActivityService } from './report-activity.service';
import { CreateReportActivityDto } from './dto/create-report-activity.dto';
import { UpdateReportActivityDto } from './dto/update-report-activity.dto';

@Controller('report-activity')
export class ReportActivityController {
  constructor(private readonly reportActivityService: ReportActivityService) {}

  @Post()
  create(@Body() createReportActivityDto: CreateReportActivityDto) {
    return this.reportActivityService.create(createReportActivityDto);
  }

  @Get()
  findAll() {
    return this.reportActivityService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.reportActivityService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateReportActivityDto: UpdateReportActivityDto) {
    return this.reportActivityService.update(id, updateReportActivityDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.reportActivityService.remove(id);
  }
}