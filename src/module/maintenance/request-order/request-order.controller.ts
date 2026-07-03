import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { RequestOrderService } from './request-order.service';
import { CreateRequestOrderDto } from './dto/create-request-order.dto';
import { UpdateRequestOrderDto } from './dto/update-request-order.dto';

@Controller('request-order')
export class RequestOrderController {
  constructor(private readonly requestOrderService: RequestOrderService) {}

  @Post()
  create(@Body() createRequestOrderDto: CreateRequestOrderDto) {
    return this.requestOrderService.create(createRequestOrderDto);
  }

  @Get()
  findAll() {
    return this.requestOrderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.requestOrderService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateRequestOrderDto: UpdateRequestOrderDto) {
    return this.requestOrderService.update(id, updateRequestOrderDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.requestOrderService.remove(id);
  }
}