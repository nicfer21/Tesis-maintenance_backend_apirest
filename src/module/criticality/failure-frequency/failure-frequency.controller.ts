import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { FailureFrequencyService } from './failure-frequency.service';
import { CreateFailureFrequencyDto } from './dto/create-failure-frequency.dto';
import { UpdateFailureFrequencyDto } from './dto/update-failure-frequency.dto';

@Controller('failure-frequency')
export class FailureFrequencyController {
  constructor(private readonly failureFrequencyService: FailureFrequencyService) {}

  @Post()
  create(@Body() createFailureFrequencyDto: CreateFailureFrequencyDto) {
    return this.failureFrequencyService.create(createFailureFrequencyDto);
  }

  @Get()
  findAll() {
    return this.failureFrequencyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.failureFrequencyService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateFailureFrequencyDto: UpdateFailureFrequencyDto) {
    return this.failureFrequencyService.update(id, updateFailureFrequencyDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.failureFrequencyService.remove(id);
  }
}