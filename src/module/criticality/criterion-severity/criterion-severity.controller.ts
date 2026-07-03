import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { CriterionSeverityService } from './criterion-severity.service';
import { CreateCriterionSeverityDto } from './dto/create-criterion-severity.dto';
import { UpdateCriterionSeverityDto } from './dto/update-criterion-severity.dto';

@Controller('criterion-severity')
export class CriterionSeverityController {
  constructor(private readonly criterionSeverityService: CriterionSeverityService) {}

  @Post()
  create(@Body() createCriterionSeverityDto: CreateCriterionSeverityDto) {
    return this.criterionSeverityService.create(createCriterionSeverityDto);
  }

  @Get()
  findAll() {
    return this.criterionSeverityService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.criterionSeverityService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateCriterionSeverityDto: UpdateCriterionSeverityDto) {
    return this.criterionSeverityService.update(id, updateCriterionSeverityDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.criterionSeverityService.remove(id);
  }
}