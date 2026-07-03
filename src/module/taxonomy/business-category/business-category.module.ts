import { Module } from '@nestjs/common';
import { BusinessCategoryService } from './business-category.service';
import { BusinessCategoryController } from './business-category.controller';
import { PrismaModule } from '../../../common/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [BusinessCategoryController],
  providers: [BusinessCategoryService],
  exports: [BusinessCategoryService],
})
export class BusinessCategoryModule {}