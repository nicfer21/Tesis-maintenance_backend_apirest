import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { CriticalitySystemService } from './criticality-system.service';
import { CreateCriticalitySystemDto } from './dto/create-criticality-system.dto';
import { UpdateCriticalitySystemDto } from './dto/update-criticality-system.dto';

@Controller('criticality-system')
export class CriticalitySystemController {
  constructor(private readonly criticalitySystemService: CriticalitySystemService) {}

  @Post()
  create(@Body() createCriticalitySystemDto: CreateCriticalitySystemDto) {
    return this.criticalitySystemService.create(createCriticalitySystemDto);
  }

  @Get()
  findAll() {
    return this.criticalitySystemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.criticalitySystemService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateCriticalitySystemDto: UpdateCriticalitySystemDto) {
    return this.criticalitySystemService.update(id, updateCriticalitySystemDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.criticalitySystemService.remove(id);
  }
}