import { Module } from '@nestjs/common';
import { CriticalityAssessmentService } from './criticality-assessment.service';
import { CriticalityAssessmentController } from './criticality-assessment.controller';
import { PrismaModule } from '../../../common/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CriticalityAssessmentController],
  providers: [CriticalityAssessmentService],
  exports: [CriticalityAssessmentService],
})
export class CriticalityAssessmentModule {}