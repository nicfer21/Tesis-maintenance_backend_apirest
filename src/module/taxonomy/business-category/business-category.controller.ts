import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { BusinessCategoryService } from './business-category.service';
import { CreateBusinessCategoryDto } from './dto/create-business-category.dto';
import { UpdateBusinessCategoryDto } from './dto/update-business-category.dto';

@Controller('business-category')
export class BusinessCategoryController {
  constructor(private readonly businessCategoryService: BusinessCategoryService) {}

  @Post()
  create(@Body() createBusinessCategoryDto: CreateBusinessCategoryDto) {
    return this.businessCategoryService.create(createBusinessCategoryDto);
  }

  @Get()
  findAll() {
    return this.businessCategoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.businessCategoryService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateBusinessCategoryDto: UpdateBusinessCategoryDto) {
    return this.businessCategoryService.update(id, updateBusinessCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.businessCategoryService.remove(id);
  }
}