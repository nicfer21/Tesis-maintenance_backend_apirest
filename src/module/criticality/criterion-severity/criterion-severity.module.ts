import { Module } from '@nestjs/common';
import { CriterionSeverityService } from './criterion-severity.service';
import { CriterionSeverityController } from './criterion-severity.controller';
import { PrismaModule } from '../../../common/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CriterionSeverityController],
  providers: [CriterionSeverityService],
  exports: [CriterionSeverityService],
})
export class CriterionSeverityModule {}