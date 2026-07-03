import { Injectable } from '@nestjs/common';
import { PrismaService } from './common/prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  async getHello() {
    let message = {
      date: new Date().toISOString(),
      db_status: false,
    };

    try {
      await this.prisma.$queryRaw`Select 1+1;`;
      message = { ...message, db_status: true };
    } catch (error) {
      message = { ...message, db_status: false };
    }

    return message;
  }
}
