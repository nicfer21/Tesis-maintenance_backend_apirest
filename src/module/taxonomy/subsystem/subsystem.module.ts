import { Module } from '@nestjs/common';
import { SubsystemService } from './subsystem.service';
import { SubsystemController } from './subsystem.controller';
import { PrismaModule } from '../../../common/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [SubsystemController],
  providers: [SubsystemService],
  exports: [SubsystemService],
})
export class SubsystemModule {}