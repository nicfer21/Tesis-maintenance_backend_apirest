-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "criticality";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "logistic";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "maintenance";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "taxonomy";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "user";

-- CreateEnum
CREATE TYPE "taxonomy"."obj_state" AS ENUM ('OPERATIVE', 'UNDER_OBSERVATION', 'OUT_OF_SERVICE', 'DECOMMISSIONED');

-- CreateEnum
CREATE TYPE "user"."WorkerLevel" AS ENUM ('ADMIN', 'ENGINEER', 'WORKER');

-- CreateEnum
CREATE TYPE "maintenance"."request_priority" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'CRITIC');

-- CreateEnum
CREATE TYPE "maintenance"."request_status" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "maintenance"."strategy" AS ENUM ('CORRECTIVE_DIAGNOSTIC', 'CORRECTIVE_TEMPORAL_REPAIR', 'CORRECTIVE_REPAIR', 'PREVENTIVE_PREVENTIVE_RESTORATION', 'PREVENTIVE_CONDITION_BASED', 'PREVENTIVE_SCHEDULED_REPLACEMENT', 'PREVENTIVE_ROUTINE_MAINTENANCE', 'PREDICTIVE_THERMOGRAPHY', 'PREDICTIVE_VIBRATIONAL', 'PREDICTIVE_OTHER_PARAMETERS');

-- CreateEnum
CREATE TYPE "logistic"."usage_type" AS ENUM ('CONSUMABLES', 'TOOLS', 'EQUIPMENT', 'RENTED', 'SERVICE');

-- CreateTable
CREATE TABLE "taxonomy"."industry" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "description" TEXT,
    "metadata" JSONB NOT NULL DEFAULT '{}',
    "image" TEXT,

    CONSTRAINT "industry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "taxonomy"."business_category" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "description" TEXT,
    "metadata" JSONB NOT NULL DEFAULT '{}',
    "image" TEXT,
    "industryId" INTEGER NOT NULL,

    CONSTRAINT "business_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "taxonomy"."facilities" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "description" TEXT,
    "metadata" JSONB NOT NULL DEFAULT '{}',
    "image" TEXT,
    "business_categoryId" INTEGER NOT NULL,

    CONSTRAINT "facilities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "taxonomy"."plant" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "description" TEXT,
    "metadata" JSONB NOT NULL DEFAULT '{}',
    "image" TEXT,
    "facilitiesId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "plant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "taxonomy"."section" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "description" TEXT,
    "metadata" JSONB NOT NULL DEFAULT '{}',
    "image" TEXT,
    "plantId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "section_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "taxonomy"."system" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "description" TEXT,
    "principal_function" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "metadata" JSONB NOT NULL DEFAULT '{}',
    "image" TEXT,
    "state" "taxonomy"."obj_state" NOT NULL,
    "sectionId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "system_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "taxonomy"."subsystem" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "description" TEXT,
    "code" TEXT NOT NULL,
    "metadata" JSONB NOT NULL DEFAULT '{}',
    "image" TEXT,
    "systemId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "subsystem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "taxonomy"."asset_maintenance" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "description" TEXT,
    "principal_function" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "benchmark" JSONB NOT NULL DEFAULT '{}',
    "metadata" JSONB NOT NULL DEFAULT '{}',
    "image" TEXT,
    "state" "taxonomy"."obj_state" NOT NULL,
    "subsystemId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "asset_maintenance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "taxonomy"."component" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "description" TEXT,
    "code" TEXT NOT NULL,
    "quantity" SMALLINT NOT NULL,
    "metadata" JSONB NOT NULL DEFAULT '{}',
    "image" TEXT,
    "asset_maintenanceId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "component_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user"."worker" (
    "id" SERIAL NOT NULL,
    "lastname" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "dni" VARCHAR(8) NOT NULL,
    "ruc" VARCHAR(11) NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "worker_level" "user"."WorkerLevel" NOT NULL,
    "metadata" JSONB NOT NULL DEFAULT '{}',
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "worker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user"."session" (
    "id" SERIAL NOT NULL,
    "metadata" JSONB NOT NULL DEFAULT '{}',
    "workerId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user"."credential" (
    "id" SERIAL NOT NULL,
    "password" TEXT NOT NULL,
    "workerId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "credential_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "criticality"."analyses_rules" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "workerId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "analyses_rules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "criticality"."analyses" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "initAnalyses" TIMESTAMP(3) NOT NULL,
    "endAnalyses" TIMESTAMP(3) NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "madeBy" TEXT NOT NULL,
    "analysesRulesId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "analyses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "criticality"."criterion_severity" (
    "id" SERIAL NOT NULL,
    "column1" TEXT NOT NULL,
    "column2" TEXT NOT NULL,
    "column3" TEXT NOT NULL,
    "column4" TEXT NOT NULL,
    "column5" TEXT NOT NULL,
    "analysesRulesId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "criterion_severity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "criticality"."criterion_classification" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "columnNumber" SMALLINT NOT NULL,
    "value" SMALLINT NOT NULL,
    "criterionSeverityId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "criterion_classification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "criticality"."failure_frequency" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "mtbfLimit" INTEGER NOT NULL,
    "value" SMALLINT NOT NULL,
    "analysesRulesId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "failure_frequency_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "criticality"."criticality_assessment" (
    "id" SERIAL NOT NULL,
    "critic_title" TEXT NOT NULL,
    "critic_value" SMALLINT NOT NULL,
    "medium_title" TEXT NOT NULL,
    "medium_value" SMALLINT NOT NULL,
    "low_title" TEXT NOT NULL,
    "low_value" TEXT NOT NULL,
    "analysesRulesId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "criticality_assessment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "criticality"."criticality_system" (
    "id" SERIAL NOT NULL,
    "value" SMALLINT NOT NULL,
    "systemId" INTEGER NOT NULL,
    "analysesId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "criticality_system_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "criticality"."criticality_asset_maintenance" (
    "id" SERIAL NOT NULL,
    "column1_value" SMALLINT NOT NULL,
    "column2_value" SMALLINT NOT NULL,
    "column3_value" SMALLINT NOT NULL,
    "column4_value" SMALLINT NOT NULL,
    "column5_value" SMALLINT NOT NULL,
    "severity_value" SMALLINT NOT NULL,
    "severity_sum" SMALLINT NOT NULL,
    "frequency_value" SMALLINT NOT NULL,
    "criticality_asset_value" SMALLINT NOT NULL,
    "assetMaintenanceId" INTEGER NOT NULL,
    "analysesId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "criticality_asset_maintenance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "maintenance"."request" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR NOT NULL,
    "code" VARCHAR NOT NULL,
    "requestDate" TIMESTAMP(3) NOT NULL,
    "approved" BOOLEAN NOT NULL DEFAULT false,
    "description" VARCHAR NOT NULL,
    "metadata" JSONB NOT NULL,
    "image" TEXT[],
    "requestPriority" "maintenance"."request_priority" NOT NULL,
    "requestStatus" "maintenance"."request_status" NOT NULL,
    "workerId" INTEGER NOT NULL,
    "systemId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "request_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "maintenance"."order" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR NOT NULL,
    "code" VARCHAR NOT NULL,
    "orderDate" TIMESTAMP(3) NOT NULL,
    "description" VARCHAR NOT NULL,
    "metadata" JSONB NOT NULL,
    "image" TEXT[],
    "orderPriority" "maintenance"."request_priority" NOT NULL,
    "orderStatus" "maintenance"."request_status" NOT NULL,
    "workerId" INTEGER NOT NULL,
    "systemId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "maintenance"."request_order" (
    "id" SERIAL NOT NULL,
    "requestId" INTEGER NOT NULL,
    "orderId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "request_order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "maintenance"."order_worker" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "workerId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "order_worker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "maintenance"."activity" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR NOT NULL,
    "description" TEXT NOT NULL,
    "strategy" "maintenance"."strategy" NOT NULL,
    "duration" INTEGER NOT NULL,
    "steps" JSONB NOT NULL,
    "metadata" JSONB NOT NULL,
    "image" VARCHAR[],
    "documentation" VARCHAR[],
    "estimatedCost" DECIMAL(10,4) NOT NULL,
    "assetMaintenanceId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "maintenance"."order_activity" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "activityId" INTEGER NOT NULL,
    "activityNumber" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "order_activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "maintenance"."activity_inventory" (
    "id" SERIAL NOT NULL,
    "activityId" INTEGER NOT NULL,
    "inventoryId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "subtotalCost" DECIMAL(10,4) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "activity_inventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "maintenance"."report" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR NOT NULL,
    "description" TEXT NOT NULL,
    "initReport" TIMESTAMP(3) NOT NULL,
    "finishReport" TIMESTAMP(3) NOT NULL,
    "handWorkTime" INTEGER NOT NULL,
    "durationReport" INTEGER NOT NULL,
    "approved" BOOLEAN NOT NULL DEFAULT false,
    "image" TEXT[],
    "documentation" TEXT[],
    "totalCost" DECIMAL(10,4) NOT NULL,
    "metadata" JSONB NOT NULL,
    "orderId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "report_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "maintenance"."report_activity" (
    "id" SERIAL NOT NULL,
    "reportId" INTEGER NOT NULL,
    "activityId" INTEGER NOT NULL,
    "activityNumber" INTEGER NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "report_activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "maintenance"."report_activity_inventory" (
    "id" SERIAL NOT NULL,
    "reportActivityId" INTEGER NOT NULL,
    "inventoryId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "subtotalCost" DECIMAL(10,4) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "report_activity_inventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "logistic"."supplier" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "description" TEXT,
    "metadata" JSONB NOT NULL DEFAULT '{}',
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "supplier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "logistic"."unit" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "unit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "logistic"."for_use" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "description" TEXT,
    "usage_type" "logistic"."usage_type" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "for_use_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "logistic"."brand" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "description" TEXT,
    "metadata" JSONB NOT NULL DEFAULT '{}',
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "brand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "logistic"."model" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "description" TEXT,
    "metadata" JSONB NOT NULL DEFAULT '{}',
    "image" TEXT,
    "brandId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "model_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "logistic"."inventory" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "description" TEXT,
    "metadata" JSONB NOT NULL DEFAULT '{}',
    "image" TEXT,
    "forUseId" INTEGER NOT NULL,
    "unitId" INTEGER NOT NULL,
    "modelId" INTEGER NOT NULL,
    "supplierId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "inventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "logistic"."inventory_detail" (
    "id" SERIAL NOT NULL,
    "inventoryId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "cost" DECIMAL(10,4) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "inventory_detail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "logistic"."entry" (
    "id" SERIAL NOT NULL,
    "entryDate" TIMESTAMP(3) NOT NULL,
    "document" VARCHAR NOT NULL,
    "metadata" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "entry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "logistic"."entry_detail" (
    "id" SERIAL NOT NULL,
    "entryId" INTEGER NOT NULL,
    "inventoryId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "cost" DECIMAL(10,4) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "entry_detail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "logistic"."inventory_component" (
    "id" SERIAL NOT NULL,
    "inventoryId" INTEGER NOT NULL,
    "componentId" INTEGER NOT NULL,
    "isOriginal" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "inventory_component_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "system_code_key" ON "taxonomy"."system"("code");

-- CreateIndex
CREATE UNIQUE INDEX "subsystem_code_key" ON "taxonomy"."subsystem"("code");

-- CreateIndex
CREATE UNIQUE INDEX "worker_dni_key" ON "user"."worker"("dni");

-- CreateIndex
CREATE UNIQUE INDEX "worker_ruc_key" ON "user"."worker"("ruc");

-- CreateIndex
CREATE UNIQUE INDEX "worker_email_key" ON "user"."worker"("email");

-- CreateIndex
CREATE UNIQUE INDEX "worker_phone_key" ON "user"."worker"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "credential_workerId_key" ON "user"."credential"("workerId");

-- AddForeignKey
ALTER TABLE "taxonomy"."business_category" ADD CONSTRAINT "business_category_industryId_fkey" FOREIGN KEY ("industryId") REFERENCES "taxonomy"."industry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "taxonomy"."facilities" ADD CONSTRAINT "facilities_business_categoryId_fkey" FOREIGN KEY ("business_categoryId") REFERENCES "taxonomy"."business_category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "taxonomy"."plant" ADD CONSTRAINT "plant_facilitiesId_fkey" FOREIGN KEY ("facilitiesId") REFERENCES "taxonomy"."facilities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "taxonomy"."section" ADD CONSTRAINT "section_plantId_fkey" FOREIGN KEY ("plantId") REFERENCES "taxonomy"."plant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "taxonomy"."system" ADD CONSTRAINT "system_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "taxonomy"."section"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "taxonomy"."subsystem" ADD CONSTRAINT "subsystem_systemId_fkey" FOREIGN KEY ("systemId") REFERENCES "taxonomy"."system"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "taxonomy"."asset_maintenance" ADD CONSTRAINT "asset_maintenance_subsystemId_fkey" FOREIGN KEY ("subsystemId") REFERENCES "taxonomy"."subsystem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "taxonomy"."component" ADD CONSTRAINT "component_asset_maintenanceId_fkey" FOREIGN KEY ("asset_maintenanceId") REFERENCES "taxonomy"."asset_maintenance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user"."session" ADD CONSTRAINT "session_workerId_fkey" FOREIGN KEY ("workerId") REFERENCES "user"."worker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user"."credential" ADD CONSTRAINT "credential_workerId_fkey" FOREIGN KEY ("workerId") REFERENCES "user"."worker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "criticality"."analyses_rules" ADD CONSTRAINT "analyses_rules_workerId_fkey" FOREIGN KEY ("workerId") REFERENCES "user"."worker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "criticality"."analyses" ADD CONSTRAINT "analyses_analysesRulesId_fkey" FOREIGN KEY ("analysesRulesId") REFERENCES "criticality"."analyses_rules"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "criticality"."criterion_severity" ADD CONSTRAINT "criterion_severity_analysesRulesId_fkey" FOREIGN KEY ("analysesRulesId") REFERENCES "criticality"."analyses_rules"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "criticality"."criterion_classification" ADD CONSTRAINT "criterion_classification_criterionSeverityId_fkey" FOREIGN KEY ("criterionSeverityId") REFERENCES "criticality"."criterion_severity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "criticality"."failure_frequency" ADD CONSTRAINT "failure_frequency_analysesRulesId_fkey" FOREIGN KEY ("analysesRulesId") REFERENCES "criticality"."analyses_rules"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "criticality"."criticality_assessment" ADD CONSTRAINT "criticality_assessment_analysesRulesId_fkey" FOREIGN KEY ("analysesRulesId") REFERENCES "criticality"."analyses_rules"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "criticality"."criticality_system" ADD CONSTRAINT "criticality_system_systemId_fkey" FOREIGN KEY ("systemId") REFERENCES "taxonomy"."system"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "criticality"."criticality_system" ADD CONSTRAINT "criticality_system_analysesId_fkey" FOREIGN KEY ("analysesId") REFERENCES "criticality"."analyses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "criticality"."criticality_asset_maintenance" ADD CONSTRAINT "criticality_asset_maintenance_assetMaintenanceId_fkey" FOREIGN KEY ("assetMaintenanceId") REFERENCES "taxonomy"."asset_maintenance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "criticality"."criticality_asset_maintenance" ADD CONSTRAINT "criticality_asset_maintenance_analysesId_fkey" FOREIGN KEY ("analysesId") REFERENCES "criticality"."analyses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenance"."request" ADD CONSTRAINT "request_workerId_fkey" FOREIGN KEY ("workerId") REFERENCES "user"."worker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenance"."request" ADD CONSTRAINT "request_systemId_fkey" FOREIGN KEY ("systemId") REFERENCES "taxonomy"."system"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenance"."order" ADD CONSTRAINT "order_workerId_fkey" FOREIGN KEY ("workerId") REFERENCES "user"."worker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenance"."order" ADD CONSTRAINT "order_systemId_fkey" FOREIGN KEY ("systemId") REFERENCES "taxonomy"."system"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenance"."request_order" ADD CONSTRAINT "request_order_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "maintenance"."request"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenance"."request_order" ADD CONSTRAINT "request_order_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "maintenance"."order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenance"."order_worker" ADD CONSTRAINT "order_worker_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "maintenance"."order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenance"."order_worker" ADD CONSTRAINT "order_worker_workerId_fkey" FOREIGN KEY ("workerId") REFERENCES "user"."worker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenance"."activity" ADD CONSTRAINT "activity_assetMaintenanceId_fkey" FOREIGN KEY ("assetMaintenanceId") REFERENCES "taxonomy"."asset_maintenance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenance"."order_activity" ADD CONSTRAINT "order_activity_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "maintenance"."order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenance"."order_activity" ADD CONSTRAINT "order_activity_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "maintenance"."activity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenance"."activity_inventory" ADD CONSTRAINT "activity_inventory_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "maintenance"."activity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenance"."activity_inventory" ADD CONSTRAINT "activity_inventory_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "logistic"."inventory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenance"."report" ADD CONSTRAINT "report_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "maintenance"."order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenance"."report_activity" ADD CONSTRAINT "report_activity_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "maintenance"."report"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenance"."report_activity" ADD CONSTRAINT "report_activity_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "maintenance"."activity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenance"."report_activity_inventory" ADD CONSTRAINT "report_activity_inventory_reportActivityId_fkey" FOREIGN KEY ("reportActivityId") REFERENCES "maintenance"."report_activity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenance"."report_activity_inventory" ADD CONSTRAINT "report_activity_inventory_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "logistic"."inventory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "logistic"."model" ADD CONSTRAINT "model_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "logistic"."brand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "logistic"."inventory" ADD CONSTRAINT "inventory_forUseId_fkey" FOREIGN KEY ("forUseId") REFERENCES "logistic"."for_use"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "logistic"."inventory" ADD CONSTRAINT "inventory_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "logistic"."unit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "logistic"."inventory" ADD CONSTRAINT "inventory_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "logistic"."model"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "logistic"."inventory" ADD CONSTRAINT "inventory_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "logistic"."supplier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "logistic"."inventory_detail" ADD CONSTRAINT "inventory_detail_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "logistic"."inventory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "logistic"."entry_detail" ADD CONSTRAINT "entry_detail_entryId_fkey" FOREIGN KEY ("entryId") REFERENCES "logistic"."entry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "logistic"."entry_detail" ADD CONSTRAINT "entry_detail_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "logistic"."inventory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "logistic"."inventory_component" ADD CONSTRAINT "inventory_component_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "logistic"."inventory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "logistic"."inventory_component" ADD CONSTRAINT "inventory_component_componentId_fkey" FOREIGN KEY ("componentId") REFERENCES "taxonomy"."component"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
