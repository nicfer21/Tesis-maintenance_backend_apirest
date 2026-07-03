import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { OrderWorkerService } from './order-worker.service';
import { CreateOrderWorkerDto } from './dto/create-order-worker.dto';
import { UpdateOrderWorkerDto } from './dto/update-order-worker.dto';

@Controller('order-worker')
export class OrderWorkerController {
  constructor(private readonly orderWorkerService: OrderWorkerService) {}

  @Post()
  create(@Body() createOrderWorkerDto: CreateOrderWorkerDto) {
    return this.orderWorkerService.create(createOrderWorkerDto);
  }

  @Get()
  findAll() {
    return this.orderWorkerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.orderWorkerService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateOrderWorkerDto: UpdateOrderWorkerDto) {
    return this.orderWorkerService.update(id, updateOrderWorkerDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.orderWorkerService.remove(id);
  }
}