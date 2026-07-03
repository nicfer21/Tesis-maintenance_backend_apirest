import { Module } from '@nestjs/common';
import { EntryDetailService } from './entry-detail.service';
import { EntryDetailController } from './entry-detail.controller';
import { PrismaModule } from '../../../common/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [EntryDetailController],
  providers: [EntryDetailService],
  exports: [EntryDetailService],
})
export class EntryDetailModule {}