import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSessionDto } from './dto/create-session.dto';
import { PrismaService } from '../../../common/prisma/prisma.service';

@Injectable()
export class SessionService {
  constructor(private readonly prisma: PrismaService) {}
  async createSession(createSessionDto: CreateSessionDto) {
    try {
      const req = await this.prisma.session.create({
        data: {
          workerId: createSessionDto.workerId,
          metadata: JSON.stringify(createSessionDto.metadata),
        },
      });

      return req;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
