import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './module/user/auth/auth.module';
import { WorkerModule } from './module/user/worker/worker.module';
import { AuthGuard } from './common/guards/auth/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { AutoGuard } from './common/guards/auto/auto.guard';
import { SessionModule } from './module/user/session/session.module';

import { RedisModule } from './common/redis/redis.module';
import { PrismaModule } from './common/prisma/prisma.module';
import { PrismaService } from './common/prisma/prisma.service';
import { LogsMiddleware } from './common/logs/logs.middleware';

// TAXONOMY MODULES
import { IndustryModule } from './module/taxonomy/industry/industry.module';
import { BusinessCategoryModule } from './module/taxonomy/business-category/business-category.module';
import { FacilitiesModule } from './module/taxonomy/facilities/facilities.module';
import { PlantModule } from './module/taxonomy/plant/plant.module';
import { SectionModule } from './module/taxonomy/section/section.module';
import { SystemModule } from './module/taxonomy/system/system.module';
import { SubsystemModule } from './module/taxonomy/subsystem/subsystem.module';
import { AssetMaintenanceModule } from './module/taxonomy/asset-maintenance/asset-maintenance.module';
import { ComponentModule } from './module/taxonomy/component/component.module';

// USER MODULES
import { CredentialModule } from './module/user/credential/credential.module';

// CRITICALITY MODULES
import { AnalysesRulesModule } from './module/criticality/analyses-rules/analyses-rules.module';
import { AnalysesModule } from './module/criticality/analyses/analyses.module';
import { CriterionSeverityModule } from './module/criticality/criterion-severity/criterion-severity.module';
import { CriterionClassificationModule } from './module/criticality/criterion-classification/criterion-classification.module';
import { FailureFrequencyModule } from './module/criticality/failure-frequency/failure-frequency.module';
import { CriticalityAssessmentModule } from './module/criticality/criticality-assessment/criticality-assessment.module';
import { CriticalitySystemModule } from './module/criticality/criticality-system/criticality-system.module';
import { CriticalityAssetMaintenanceModule } from './module/criticality/criticality-asset-maintenance/criticality-asset-maintenance.module';

// MAINTENANCE MODULES
import { RequestModule } from './module/maintenance/request/request.module';
import { OrderModule } from './module/maintenance/order/order.module';
import { RequestOrderModule } from './module/maintenance/request-order/request-order.module';
import { OrderWorkerModule } from './module/maintenance/order-worker/order-worker.module';
import { ActivityModule } from './module/maintenance/activity/activity.module';
import { OrderActivityModule } from './module/maintenance/order-activity/order-activity.module';
import { ActivityInventoryModule } from './module/maintenance/activity-inventory/activity-inventory.module';
import { ReportModule } from './module/maintenance/report/report.module';
import { ReportActivityModule } from './module/maintenance/report-activity/report-activity.module';
import { ReportActivityInventoryModule } from './module/maintenance/report-activity-inventory/report-activity-inventory.module';

// LOGISTIC MODULES
import { SupplierModule } from './module/logistic/supplier/supplier.module';
import { UnitModule } from './module/logistic/unit/unit.module';
import { ForUseModule } from './module/logistic/for-use/for-use.module';
import { BrandModule } from './module/logistic/brand/brand.module';
import { ModelModule } from './module/logistic/model/model.module';
import { InventoryModule } from './module/logistic/inventory/inventory.module';
import { InventoryDetailModule } from './module/logistic/inventory-detail/inventory-detail.module';
import { EntryModule } from './module/logistic/entry/entry.module';
import { EntryDetailModule } from './module/logistic/entry-detail/entry-detail.module';
import { InventoryComponentModule } from './module/logistic/inventory-component/inventory-component.module';

// FILE MODULES
import { ImageModule } from './module/file/image/image.module';
import { PdfModule } from './module/file/pdf/pdf.module';

//Vincular todos los guards para que sean globales, creo que es la mejor opción
@Module({
  imports: [
    PrismaModule,
    AuthModule,

    RedisModule,
    // TAXONOMY
    IndustryModule,
    BusinessCategoryModule,
    FacilitiesModule,
    PlantModule,
    SectionModule,
    SystemModule,
    SubsystemModule,
    AssetMaintenanceModule,
    ComponentModule,
    // USER
    CredentialModule,
    WorkerModule,
    SessionModule,
    // CRITICALITY
    AnalysesRulesModule,
    AnalysesModule,
    CriterionSeverityModule,
    CriterionClassificationModule,
    FailureFrequencyModule,
    CriticalityAssessmentModule,
    CriticalitySystemModule,
    CriticalityAssetMaintenanceModule,
    // MAINTENANCE
    RequestModule,
    OrderModule,
    RequestOrderModule,
    OrderWorkerModule,
    ActivityModule,
    OrderActivityModule,
    ActivityInventoryModule,
    ReportModule,
    ReportActivityModule,
    ReportActivityInventoryModule,
    // LOGISTIC
    SupplierModule,
    UnitModule,
    ForUseModule,
    BrandModule,
    ModelModule,
    InventoryModule,
    InventoryDetailModule,
    EntryModule,
    EntryDetailModule,
    InventoryComponentModule,

    // FILE

    ImageModule,
    PdfModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    {
      useClass: AuthGuard,
      provide: APP_GUARD,
    },
    {
      useClass: AutoGuard,
      provide: APP_GUARD,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogsMiddleware).forRoutes('*');
  }
}
