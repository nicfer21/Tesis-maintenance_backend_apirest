import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { CreateAnalysesRulesDto } from './dto/create-analyses-rules.dto';
import { UpdateAnalysesRulesDto } from './dto/update-analyses-rules.dto';

@Injectable()
export class AnalysesRulesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createAnalysesRulesDto: CreateAnalysesRulesDto) {
    return this.prisma.analyses_rules.create({
      data: createAnalysesRulesDto,
    });
  }

  async findAll() {
    return this.prisma.analyses_rules.findMany();
  }

  async findOne(id: number) {
    return this.prisma.analyses_rules.findUniqueOrThrow({
      where: { id },
    });
  }

  async update(id: number, updateAnalysesRulesDto: UpdateAnalysesRulesDto) {
    return this.prisma.analyses_rules.update({
      where: { id },
      data: updateAnalysesRulesDto,
    });
  }

  async remove(id: number) {
    return this.prisma.analyses_rules.delete({
      where: { id },
    });
  }
}