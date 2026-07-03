import { Module } from '@nestjs/common';
import { AnalysesRulesService } from './analyses-rules.service';
import { AnalysesRulesController } from './analyses-rules.controller';
import { PrismaModule } from '../../../common/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AnalysesRulesController],
  providers: [AnalysesRulesService],
  exports: [AnalysesRulesService],
})
export class AnalysesRulesModule {}