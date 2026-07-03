import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { AnalysesService } from './analyses.service';
import { CreateAnalysesDto } from './dto/create-analyses.dto';
import { UpdateAnalysesDto } from './dto/update-analyses.dto';

@Controller('analyses')
export class AnalysesController {
  constructor(private readonly analysesService: AnalysesService) {}

  @Post()
  create(@Body() createAnalysesDto: CreateAnalysesDto) {
    return this.analysesService.create(createAnalysesDto);
  }

  @Get()
  findAll() {
    return this.analysesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.analysesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateAnalysesDto: UpdateAnalysesDto) {
    return this.analysesService.update(id, updateAnalysesDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.analysesService.remove(id);
  }
}