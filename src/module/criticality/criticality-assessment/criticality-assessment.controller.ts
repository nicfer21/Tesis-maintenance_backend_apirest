import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { CriticalityAssessmentService } from './criticality-assessment.service';
import { CreateCriticalityAssessmentDto } from './dto/create-criticality-assessment.dto';
import { UpdateCriticalityAssessmentDto } from './dto/update-criticality-assessment.dto';

@Controller('criticality-assessment')
export class CriticalityAssessmentController {
  constructor(private readonly criticalityAssessmentService: CriticalityAssessmentService) {}

  @Post()
  create(@Body() createCriticalityAssessmentDto: CreateCriticalityAssessmentDto) {
    return this.criticalityAssessmentService.create(createCriticalityAssessmentDto);
  }

  @Get()
  findAll() {
    return this.criticalityAssessmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.criticalityAssessmentService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateCriticalityAssessmentDto: UpdateCriticalityAssessmentDto) {
    return this.criticalityAssessmentService.update(id, updateCriticalityAssessmentDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.criticalityAssessmentService.remove(id);
  }
}