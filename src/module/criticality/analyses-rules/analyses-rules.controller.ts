import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { AnalysesRulesService } from './analyses-rules.service';
import { CreateAnalysesRulesDto } from './dto/create-analyses-rules.dto';
import { UpdateAnalysesRulesDto } from './dto/update-analyses-rules.dto';

@Controller('analyses-rules')
export class AnalysesRulesController {
  constructor(private readonly analysesRulesService: AnalysesRulesService) {}

  @Post()
  create(@Body() createAnalysesRulesDto: CreateAnalysesRulesDto) {
    return this.analysesRulesService.create(createAnalysesRulesDto);
  }

  @Get()
  findAll() {
    return this.analysesRulesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.analysesRulesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateAnalysesRulesDto: UpdateAnalysesRulesDto) {
    return this.analysesRulesService.update(id, updateAnalysesRulesDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.analysesRulesService.remove(id);
  }
}