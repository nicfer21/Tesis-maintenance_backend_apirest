import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { InventoryComponentService } from './inventory-component.service';
import { CreateInventoryComponentDto } from './dto/create-inventory-component.dto';
import { UpdateInventoryComponentDto } from './dto/update-inventory-component.dto';

@Controller('inventory-component')
export class InventoryComponentController {
  constructor(private readonly inventoryComponentService: InventoryComponentService) {}

  @Post()
  create(@Body() createInventoryComponentDto: CreateInventoryComponentDto) {
    return this.inventoryComponentService.create(createInventoryComponentDto);
  }

  @Get()
  findAll() {
    return this.inventoryComponentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.inventoryComponentService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateInventoryComponentDto: UpdateInventoryComponentDto) {
    return this.inventoryComponentService.update(id, updateInventoryComponentDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.inventoryComponentService.remove(id);
  }
}