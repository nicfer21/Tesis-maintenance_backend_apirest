import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { InventoryDetailService } from './inventory-detail.service';
import { CreateInventoryDetailDto } from './dto/create-inventory-detail.dto';
import { UpdateInventoryDetailDto } from './dto/update-inventory-detail.dto';

@Controller('inventory-detail')
export class InventoryDetailController {
  constructor(private readonly inventoryDetailService: InventoryDetailService) {}

  @Post()
  create(@Body() createInventoryDetailDto: CreateInventoryDetailDto) {
    return this.inventoryDetailService.create(createInventoryDetailDto);
  }

  @Get()
  findAll() {
    return this.inventoryDetailService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.inventoryDetailService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateInventoryDetailDto: UpdateInventoryDetailDto) {
    return this.inventoryDetailService.update(id, updateInventoryDetailDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.inventoryDetailService.remove(id);
  }
}