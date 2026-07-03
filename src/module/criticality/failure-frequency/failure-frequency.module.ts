import { Module } from '@nestjs/common';
import { FailureFrequencyService } from './failure-frequency.service';
import { FailureFrequencyController } from './failure-frequency.controller';
import { PrismaModule } from '../../../common/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [FailureFrequencyController],
  providers: [FailureFrequencyService],
  exports: [FailureFrequencyService],
})
export class FailureFrequencyModule {}