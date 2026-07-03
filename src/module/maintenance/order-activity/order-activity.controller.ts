import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { OrderActivityService } from './order-activity.service';
import { CreateOrderActivityDto } from './dto/create-order-activity.dto';
import { UpdateOrderActivityDto } from './dto/update-order-activity.dto';

@Controller('order-activity')
export class OrderActivityController {
  constructor(private readonly orderActivityService: OrderActivityService) {}

  @Post()
  create(@Body() createOrderActivityDto: CreateOrderActivityDto) {
    return this.orderActivityService.create(createOrderActivityDto);
  }

  @Get()
  findAll() {
    return this.orderActivityService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.orderActivityService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateOrderActivityDto: UpdateOrderActivityDto) {
    return this.orderActivityService.update(id, updateOrderActivityDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.orderActivityService.remove(id);
  }
}