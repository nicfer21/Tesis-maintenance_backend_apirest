import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { CreateFailureFrequencyDto } from './dto/create-failure-frequency.dto';
import { UpdateFailureFrequencyDto } from './dto/update-failure-frequency.dto';

@Injectable()
export class FailureFrequencyService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createFailureFrequencyDto: CreateFailureFrequencyDto) {
    return this.prisma.failure_frequency.create({
      data: createFailureFrequencyDto,
    });
  }

  async findAll() {
    return this.prisma.failure_frequency.findMany();
  }

  async findOne(id: number) {
    return this.prisma.failure_frequency.findUniqueOrThrow({
      where: { id },
    });
  }

  async update(id: number, updateFailureFrequencyDto: UpdateFailureFrequencyDto) {
    return this.prisma.failure_frequency.update({
      where: { id },
      data: updateFailureFrequencyDto,
    });
  }

  async remove(id: number) {
    return this.prisma.failure_frequency.delete({
      where: { id },
    });
  }
}