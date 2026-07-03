import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { CriterionClassificationService } from './criterion-classification.service';
import { CreateCriterionClassificationDto } from './dto/create-criterion-classification.dto';
import { UpdateCriterionClassificationDto } from './dto/update-criterion-classification.dto';

@Controller('criterion-classification')
export class CriterionClassificationController {
  constructor(private readonly criterionClassificationService: CriterionClassificationService) {}

  @Post()
  create(@Body() createCriterionClassificationDto: CreateCriterionClassificationDto) {
    return this.criterionClassificationService.create(createCriterionClassificationDto);
  }

  @Get()
  findAll() {
    return this.criterionClassificationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.criterionClassificationService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateCriterionClassificationDto: UpdateCriterionClassificationDto) {
    return this.criterionClassificationService.update(id, updateCriterionClassificationDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.criterionClassificationService.remove(id);
  }
}