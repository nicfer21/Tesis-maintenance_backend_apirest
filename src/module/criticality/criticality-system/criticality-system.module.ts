import { Module } from '@nestjs/common';
import { CriticalitySystemService } from './criticality-system.service';
import { CriticalitySystemController } from './criticality-system.controller';
import { PrismaModule } from '../../../common/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CriticalitySystemController],
  providers: [CriticalitySystemService],
  exports: [CriticalitySystemService],
})
export class CriticalitySystemModule {}