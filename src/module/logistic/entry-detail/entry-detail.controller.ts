import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { EntryDetailService } from './entry-detail.service';
import { CreateEntryDetailDto } from './dto/create-entry-detail.dto';
import { UpdateEntryDetailDto } from './dto/update-entry-detail.dto';

@Controller('entry-detail')
export class EntryDetailController {
  constructor(private readonly entryDetailService: EntryDetailService) {}

  @Post()
  create(@Body() createEntryDetailDto: CreateEntryDetailDto) {
    return this.entryDetailService.create(createEntryDetailDto);
  }

  @Get()
  findAll() {
    return this.entryDetailService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.entryDetailService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateEntryDetailDto: UpdateEntryDetailDto) {
    return this.entryDetailService.update(id, updateEntryDetailDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.entryDetailService.remove(id);
  }
}