import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ActivityInventoryService } from './activity-inventory.service';
import { CreateActivityInventoryDto } from './dto/create-activity-inventory.dto';
import { UpdateActivityInventoryDto } from './dto/update-activity-inventory.dto';

@Controller('activity-inventory')
export class ActivityInventoryController {
  constructor(private readonly activityInventoryService: ActivityInventoryService) {}

  @Post()
  create(@Body() createActivityInventoryDto: CreateActivityInventoryDto) {
    return this.activityInventoryService.create(createActivityInventoryDto);
  }

  @Get()
  findAll() {
    return this.activityInventoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.activityInventoryService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateActivityInventoryDto: UpdateActivityInventoryDto) {
    return this.activityInventoryService.update(id, updateActivityInventoryDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.activityInventoryService.remove(id);
  }
}