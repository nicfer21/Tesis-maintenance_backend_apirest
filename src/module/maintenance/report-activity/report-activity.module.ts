import { Module } from '@nestjs/common';
import { ReportActivityService } from './report-activity.service';
import { ReportActivityController } from './report-activity.controller';
import { PrismaModule } from '../../../common/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ReportActivityController],
  providers: [ReportActivityService],
  exports: [ReportActivityService],
})
export class ReportActivityModule {}