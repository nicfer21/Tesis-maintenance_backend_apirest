import { Module } from '@nestjs/common';
import { ForUseService } from './for-use.service';
import { ForUseController } from './for-use.controller';
import { PrismaModule } from '../../../common/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ForUseController],
  providers: [ForUseService],
  exports: [ForUseService],
})
export class ForUseModule {}