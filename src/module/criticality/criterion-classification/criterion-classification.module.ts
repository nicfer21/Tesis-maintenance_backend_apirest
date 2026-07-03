import { Module } from '@nestjs/common';
import { CriterionClassificationService } from './criterion-classification.service';
import { CriterionClassificationController } from './criterion-classification.controller';
import { PrismaModule } from '../../../common/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CriterionClassificationController],
  providers: [CriterionClassificationService],
  exports: [CriterionClassificationService],
})
export class CriterionClassificationModule {}