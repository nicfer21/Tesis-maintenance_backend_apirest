import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { FacilitiesService } from './facilities.service';
import { CreateFacilitiesDto } from './dto/create-facilities.dto';
import { UpdateFacilitiesDto } from './dto/update-facilities.dto';

@Controller('facilities')
export class FacilitiesController {
  constructor(private readonly facilitiesService: FacilitiesService) {}

  @Post()
  create(@Body() createFacilitiesDto: CreateFacilitiesDto) {
    return this.facilitiesService.create(createFacilitiesDto);
  }

  @Get()
  findAll() {
    return this.facilitiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.facilitiesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateFacilitiesDto: UpdateFacilitiesDto) {
    return this.facilitiesService.update(id, updateFacilitiesDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.facilitiesService.remove(id);
  }
}