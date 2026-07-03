import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ForUseService } from './for-use.service';
import { CreateForUseDto } from './dto/create-for-use.dto';
import { UpdateForUseDto } from './dto/update-for-use.dto';

@Controller('for-use')
export class ForUseController {
  constructor(private readonly forUseService: ForUseService) {}

  @Post()
  create(@Body() createForUseDto: CreateForUseDto) {
    return this.forUseService.create(createForUseDto);
  }

  @Get()
  findAll() {
    return this.forUseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.forUseService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateForUseDto: UpdateForUseDto) {
    return this.forUseService.update(id, updateForUseDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.forUseService.remove(id);
  }
}