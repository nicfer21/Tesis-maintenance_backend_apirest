// ======================
// ENUMS
// ======================

export enum ObjState {
  OPERATIVE = "OPERATIVE",
  UNDER_OBSERVATION = "UNDER_OBSERVATION",
  OUT_OF_SERVICE = "OUT_OF_SERVICE",
  DECOMMISSIONED = "DECOMMISSIONED",
}

export enum WorkerLevel {
  ADMIN = "ADMIN",
  ENGINEER = "ENGINEER",
  WORKER = "WORKER",
}

export enum RequestPriority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  CRITIC = "CRITIC",
}

export enum RequestStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export enum Strategy {
  CORRECTIVE_DIAGNOSTIC = "CORRECTIVE_DIAGNOSTIC",
  CORRECTIVE_TEMPORAL_REPAIR = "CORRECTIVE_TEMPORAL_REPAIR",
  CORRECTIVE_REPAIR = "CORRECTIVE_REPAIR",
  PREVENTIVE_PREVENTIVE_RESTORATION = "PREVENTIVE_PREVENTIVE_RESTORATION",
  PREVENTIVE_CONDITION_BASED = "PREVENTIVE_CONDITION_BASED",
  PREVENTIVE_SCHEDULED_REPLACEMENT = "PREVENTIVE_SCHEDULED_REPLACEMENT",
  PREVENTIVE_ROUTINE_MAINTENANCE = "PREVENTIVE_ROUTINE_MAINTENANCE",
  PREDICTIVE_THERMOGRAPHY = "PREDICTIVE_THERMOGRAPHY",
  PREDICTIVE_VIBRATIONAL = "PREDICTIVE_VIBRATIONAL",
  PREDICTIVE_OTHER_PARAMETERS = "PREDICTIVE_OTHER_PARAMETERS",
}

export enum UsageType {
  CONSUMABLES = "CONSUMABLES",
  TOOLS = "TOOLS",
  EQUIPMENT = "EQUIPMENT",
  RENTED = "RENTED",
  SERVICE = "SERVICE",
}

// ======================
// TAXONOMY SCHEMA
// ======================

export interface Industry {
  id: number;
  name: string;
  description?: string;
  metadata: Record<string, any>;
  image?: string;
  businessCategories?: BusinessCategory[];
}

export interface BusinessCategory {
  id: number;
  name: string;
  description?: string;
  metadata: Record<string, any>;
  image?: string;
  industryId: number;
  industry?: Industry;
  facilities?: Facilities[];
}

export interface Facilities {
  id: number;
  name: string;
  description?: string;
  metadata: Record<string, any>;
  image?: string;
  business_categoryId: number;
  business_category?: BusinessCategory;
  plants?: Plant[];
}

export interface Plant {
  id: number;
  name: string;
  description?: string;
  metadata: Record<string, any>;
  image?: string;
  facilitiesId: number;
  facilities?: Facilities;
  createdAt?: Date;
  updatedAt?: Date;
  sections?: Section[];
}

export interface Section {
  id: number;
  name: string;
  description?: string;
  metadata: Record<string, any>;
  image?: string;
  plantId: number;
  plant?: Plant;
  createdAt?: Date;
  updatedAt?: Date;
  systems?: System[];
}

export interface System {
  id: number;
  name: string;
  description?: string;
  principal_function: string;
  code: string;
  metadata: Record<string, any>;
  image?: string;
  state: ObjState;
  sectionId: number;
  section?: Section;
  createdAt?: Date;
  updatedAt?: Date;
  subsystems?: Subsystem[];
  criticalitySystems?: CriticalitySystem[];
  requests?: Request[];
  orders?: Order[];
}

export interface Subsystem {
  id: number;
  name: string;
  description?: string;
  code: string;
  metadata: Record<string, any>;
  image?: string;
  systemId: number;
  system?: System;
  createdAt?: Date;
  updatedAt?: Date;
  assetMaintenances?: AssetMaintenance[];
}

export interface AssetMaintenance {
  id: number;
  name: string;
  description?: string;
  principal_function: string;
  code: string;
  benchmark: Record<string, any>;
  metadata: Record<string, any>;
  image?: string;
  state: ObjState;
  subsystemId: number;
  subsystem?: Subsystem;
  createdAt?: Date;
  updatedAt?: Date;
  components?: Component[];
  criticalityAssetMaintenances?: CriticalityAssetMaintenance[];
  activities?: Activity[];
}

export interface Component {
  id: number;
  name: string;
  description?: string;
  code: string;
  quantity: number;
  metadata: Record<string, any>;
  image?: string;
  asset_maintenanceId: number;
  asset_maintenance?: AssetMaintenance;
  createdAt?: Date;
  updatedAt?: Date;
  inventoryComponents?: InventoryComponent[];
}

// ======================
// USER SCHEMA
// ======================

export interface Worker {
  id: number;
  lastname: string;
  firstname: string;
  dni: string;
  ruc: string;
  email: string;
  phone: string;
  status: boolean;
  worker_level: WorkerLevel;
  metadata: Record<string, any>;
  image?: string;
  createdAt?: Date;
  updatedAt?: Date;
  sessions?: Session[];
  credentials?: Credential[];
  analysesRules?: AnalysesRules[];
  requests?: Request[];
  orders?: Order[];
  orderWorkers?: OrderWorker[];
}

export interface Session {
  id: number;
  metadata: Record<string, any>;
  workerId: number;
  worker?: Worker;
  createdAt?: Date;
}

export interface Credential {
  id: number;
  password: string;
  workerId: number;
  worker?: Worker;
  createdAt?: Date;
}

// ======================
// CRITICALITY SCHEMA
// ======================

export interface AnalysesRules {
  id: number;
  title: string;
  workerId: number;
  createdAt?: Date;
  updatedAt?: Date;
  worker?: Worker;
  analyses?: Analyses[];
  criterionSeverities?: CriterionSeverity[];
  failureFrequencies?: FailureFrequency[];
  criticalityAssessments?: CriticalityAssessment[];
}

export interface Analyses {
  id: number;
  title: string;
  description: string;
  initAnalyses: Date;
  endAnalyses: Date;
  completed: boolean;
  madeBy: string;
  analysesRulesId: number;
  createdAt?: Date;
  updatedAt?: Date;
  analysesRules?: AnalysesRules;
  criticalitySystems?: CriticalitySystem[];
  criticalityAssetMaintenances?: CriticalityAssetMaintenance[];
}

export interface CriterionSeverity {
  id: number;
  column1: string;
  column2: string;
  column3: string;
  column4: string;
  column5: string;
  analysesRulesId: number;
  createdAt?: Date;
  updatedAt?: Date;
  analysesRules?: AnalysesRules;
  criterionClassifications?: CriterionClassification[];
}

export interface CriterionClassification {
  id: number;
  title: string;
  columnNumber: number;
  value: number;
  criterionSeverityId: number;
  createdAt?: Date;
  updatedAt?: Date;
  criterionSeverity?: CriterionSeverity;
}

export interface FailureFrequency {
  id: number;
  title: string;
  mtbfLimit: number;
  value: number;
  analysesRulesId: number;
  createdAt?: Date;
  updatedAt?: Date;
  analysesRules?: AnalysesRules;
}

export interface CriticalityAssessment {
  id: number;
  critic_title: string;
  critic_value: number;
  medium_title: string;
  medium_value: number;
  low_title: string;
  low_value: string;
  analysesRulesId: number;
  createdAt?: Date;
  updatedAt?: Date;
  analysesRules?: AnalysesRules;
}

export interface CriticalitySystem {
  id: number;
  value: number;
  systemId: number;
  analysesId: number;
  createdAt?: Date;
  updatedAt?: Date;
  system?: System;
  analyses?: Analyses;
}

export interface CriticalityAssetMaintenance {
  id: number;
  column1_value: number;
  column2_value: number;
  column3_value: number;
  column4_value: number;
  column5_value: number;
  severity_value: number;
  severity_sum: number;
  frequency_value: number;
  criticality_asset_value: number;
  assetMaintenanceId: number;
  analysesId: number;
  createdAt?: Date;
  updatedAt?: Date;
  assetMaintenance?: AssetMaintenance;
  analyses?: Analyses;
}

// ======================
// MAINTENANCE SCHEMA
// ======================

export interface Request {
  id: number;
  title: string;
  code: string;
  requestDate: Date;
  approved: boolean;
  description: string;
  metadata: Record<string, any>;
  image: string[];
  requestPriority: RequestPriority;
  requestStatus: RequestStatus;
  workerId: number;
  worker?: Worker;
  systemId: number;
  system?: System;
  createdAt?: Date;
  updatedAt?: Date;
  requestOrders?: RequestOrder[];
}

export interface Order {
  id: number;
  title: string;
  code: string;
  orderDate: Date;
  description: string;
  metadata: Record<string, any>;
  image: string[];
  orderPriority: RequestPriority;
  orderStatus: RequestStatus;
  workerId: number;
  worker?: Worker;
  systemId: number;
  system?: System;
  createdAt?: Date;
  updatedAt?: Date;
  requestOrders?: RequestOrder[];
  orderWorkers?: OrderWorker[];
  orderActivities?: OrderActivity[];
  reports?: Report[];
}

export interface RequestOrder {
  id: number;
  requestId: number;
  orderId: number;
  request?: Request;
  order?: Order;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface OrderWorker {
  id: number;
  orderId: number;
  workerId: number;
  order?: Order;
  worker?: Worker;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Activity {
  id: number;
  title: string;
  description: string;
  strategy: Strategy;
  duration: number;
  steps: Record<string, any>;
  metadata: Record<string, any>;
  image: string[];
  documentation: string[];
  estimatedCost: number;
  assetMaintenanceId: number;
  assetMaintenance?: AssetMaintenance;
  createdAt?: Date;
  updatedAt?: Date;
  orderActivities?: OrderActivity[];
  activityInventories?: ActivityInventory[];
  reportActivities?: ReportActivity[];
}

export interface OrderActivity {
  id: number;
  orderId: number;
  activityId: number;
  activityNumber: number;
  order?: Order;
  activity?: Activity;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ActivityInventory {
  id: number;
  activityId: number;
  inventoryId: number;
  quantity: number;
  subtotalCost: number;
  activity?: Activity;
  inventory?: Inventory;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Report {
  id: number;
  title: string;
  description: string;
  initReport: Date;
  finishReport: Date;
  handWorkTime: number;
  durationReport: number;
  approved: boolean;
  image: string[];
  documentation: string[];
  totalCost: number;
  metadata: Record<string, any>;
  orderId: number;
  order?: Order;
  createdAt?: Date;
  updatedAt?: Date;
  reportActivities?: ReportActivity[];
}

export interface ReportActivity {
  id: number;
  reportId: number;
  activityId: number;
  activityNumber: number;
  completed: boolean;
  report?: Report;
  activity?: Activity;
  createdAt?: Date;
  updatedAt?: Date;
  reportActivityInventories?: ReportActivityInventory[];
}

export interface ReportActivityInventory {
  id: number;
  reportActivityId: number;
  inventoryId: number;
  quantity: number;
  subtotalCost: number;
  reportActivity?: ReportActivity;
  inventory?: Inventory;
  createdAt?: Date;
  updatedAt?: Date;
}

// ======================
// LOGISTIC SCHEMA
// ======================

export interface Supplier {
  id: number;
  name: string;
  description?: string;
  metadata: Record<string, any>;
  image?: string;
  createdAt?: Date;
  updatedAt?: Date;
  inventories?: Inventory[];
}

export interface Unit {
  id: number;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
  inventories?: Inventory[];
}

export interface ForUse {
  id: number;
  name: string;
  description?: string;
  usage_type: UsageType;
  createdAt?: Date;
  updatedAt?: Date;
  inventories?: Inventory[];
}

export interface Brand {
  id: number;
  name: string;
  description?: string;
  metadata: Record<string, any>;
  image?: string;
  createdAt?: Date;
  updatedAt?: Date;
  models?: Model[];
}

export interface Model {
  id: number;
  name: string;
  description?: string;
  metadata: Record<string, any>;
  image?: string;
  brandId: number;
  brand?: Brand;
  createdAt?: Date;
  updatedAt?: Date;
  inventories?: Inventory[];
}

export interface Inventory {
  id: number;
  name: string;
  description?: string;
  metadata: Record<string, any>;
  image?: string;
  forUseId: number;
  forUse?: ForUse;
  unitId: number;
  unit?: Unit;
  modelId: number;
  model?: Model;
  supplierId: number;
  supplier?: Supplier;
  createdAt?: Date;
  updatedAt?: Date;
  reportActivityInventories?: ReportActivityInventory[];
  activityInventories?: ActivityInventory[];
  inventoryDetails?: InventoryDetail[];
  entryDetails?: EntryDetail[];
  inventoryComponents?: InventoryComponent[];
}

export interface InventoryDetail {
  id: number;
  inventoryId: number;
  inventory?: Inventory;
  quantity: number;
  cost: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Entry {
  id: number;
  entryDate: Date;
  document: string;
  metadata: Record<string, any>;
  createdAt?: Date;
  updatedAt?: Date;
  entryDetails?: EntryDetail[];
}

export interface EntryDetail {
  id: number;
  entryId: number;
  inventoryId: number;
  quantity: number;
  cost: number;
  entry?: Entry;
  inventory?: Inventory;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface InventoryComponent {
  id: number;
  inventoryId: number;
  componentId: number;
  isOriginal: boolean;
  inventory?: Inventory;
  component?: Component;
  createdAt?: Date;
  updatedAt?: Date;
}

// ======================
// API RESPONSE TYPES
// ======================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// ======================
// UTILITY TYPES
// ======================

export type CreateWorkerDTO = Omit<Worker, "id" | "createdAt" | "updatedAt" | "sessions" | "credentials" | "analysesRules" | "requests" | "orders" | "orderWorkers">;
export type UpdateWorkerDTO = Partial<CreateWorkerDTO>;

export type CreateSystemDTO = Omit<System, "id" | "createdAt" | "updatedAt" | "subsystems" | "criticalitySystems" | "requests" | "orders">;
export type UpdateSystemDTO = Partial<CreateSystemDTO>;

export type CreateRequestDTO = Omit<Request, "id" | "createdAt" | "updatedAt" | "requestOrders">;
export type UpdateRequestDTO = Partial<CreateRequestDTO>;

export type CreateOrderDTO = Omit<Order, "id" | "createdAt" | "updatedAt" | "requestOrders" | "orderWorkers" | "orderActivities" | "reports">;
export type UpdateOrderDTO = Partial<CreateOrderDTO>;

export type CreateInventoryDTO = Omit<Inventory, "id" | "createdAt" | "updatedAt" | "reportActivityInventories" | "activityInventories" | "inventoryDetails" | "entryDetails" | "inventoryComponents">;
export type UpdateInventoryDTO = Partial<CreateInventoryDTO>;

export type CreateActivityDTO = Omit<Activity, "id" | "createdAt" | "updatedAt" | "orderActivities" | "activityInventories" | "reportActivities">;
export type UpdateActivityDTO = Partial<CreateActivityDTO>;
