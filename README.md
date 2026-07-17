# Maintenance System Backend para el sistema de gestión de mantenimiento

## 🧩 Sistema de Gestión de Mantenimiento y Activos

Este proyecto tiene como objetivo desarrollar un **backend modular** para la gestión de mantenimiento industrial, control de activos, inventario, órdenes de trabajo, usuarios y análisis de confiabilidad.  
El sistema está diseñado para ser escalable y adaptable a distintas empresas manufactureras o agroindustriales.

---

## 🚀 Objetivos del Proyecto

- Implementar un sistema de mantenimiento basado en la **ISO 14224**.
- Gestionar activos, planes de mantenimiento, repuestos y órdenes de trabajo.
- Integrar módulos de análisis de disponibilidad, criticidad y reportes.
- Permitir futura integración con módulos **IoT** (para mantenimiento predictivo con microcontroladores).
- Mantener una arquitectura modular que facilite su adaptación a distintas organizaciones.

---

## 🏗️ Arquitectura General

El backend está construido en **NestJS** con **Prisma ORM**, utilizando **PostgreSQL** como base relacional principal y esta se conectara a otro servidor que se encargara de enviar, obtener, analizar o preparar los datos obtenidos de los microcontroladores para el mantenimiento predictivo.

<pre>
┌──────────────────────┐
│      FrontEnd        │
└──────────────────────┘
          │
          │
          ▼
┌──────────────────────────────┐
│   NestJS Maintenance Backend │
│  ├── Users                   │
│  ├── Maintenance             │
│  ├── Logistic                │
│  ├── Taxonomy                │
│  ├── Place                   │
│  ├── IOT (Server)            │
└──────────────────────────────┘
          │             │
          │             │
          ▼             ▼
┌───────────────┐   ┌───────────────┐
│   PostgreSQL  │   │   Server IOT  │
└───────────────┘   └───────────────┘
                             │
                             │
                             ▼
                    ┌───────────────┐
                    │   MongoDB     │
                    └───────────────┘
</pre>

---

## ⚙️ Tecnologías Principales

| Componente                  | Tecnología   |
| --------------------------- | ------------ |
| Lenguaje                    | TypeScript   |
| Framework Backend           | NestJS       |
| ORM                         | Prisma       |
| Base de datos relacional    | PostgreSQL   |
| Base de datos no relacional | MongoDB      |
| Herramienta de conexión DB  | pg/admin     |
| Control de versiones        | Git & GitHub |

---

## 🔐 Configuración de Base de Datos

### PostgreSQL

username = postgres
password = 1234
host = 192.168.0.151:5432
database = maintenance_system_dev

Para el usuario-API que consumirá los datos de la base de datos (solamente Insert, Select, Update and Delete)

CREATE USER maintenance_system_user WITH PASSWORD 'maintenance_system_user';

## Próximos pasos

Crear el repositorio Git y subir la estructura inicial.
Configurar Prisma para conexión con PostgreSQL.
Implementar el módulo de activos y usuarios.
Definir el esquema base de mantenimiento (activos → planes → órdenes → reportes).
Añadir conexión secundaria a MongoDB (para informes y logs).
(Opcional) Implementar servicio IoT para recibir datos de microcontroladores.

## Licencia

Proyecto desarrollado con fines académicos y técnicos para implementación de un sistema de gestión de mantenimiento modular y escalable.

## Autor

Nicolás Fernando Palomino Boncun
Bachiller en Ingeniería Industrial – Especialista en Gestión de Mantenimiento y Proyectos.

```
apirest_backend
├─ .prettierrc
├─ diagramDB.dbdiagram
├─ diagramDB.dbml
├─ docker-compose.yml
├─ Dockerfile
├─ eslint.config.mjs
├─ nest-cli.json
├─ package-lock.json
├─ package.json
├─ prisma
│  ├─ migrations
│  │  ├─ 20260622070321_init
│  │  │  └─ migration.sql
│  │  └─ migration_lock.toml
│  ├─ schema.prisma
│  └─ seed.ts
├─ prisma.config.ts
├─ README.md
├─ src
│  ├─ app.controller.ts
│  ├─ app.module.ts
│  ├─ app.service.ts
│  ├─ common
│  │  ├─ decorators
│  │  │  ├─ public
│  │  │  │  └─ public.decorator.ts
│  │  │  └─ roles
│  │  │     └─ roles.decorator.ts
│  │  ├─ filter
│  │  │  └─ http-exception.filter
│  │  │     └─ http-exception.filter.ts
│  │  ├─ guards
│  │  │  ├─ auth
│  │  │  │  └─ auth.guard.ts
│  │  │  └─ auto
│  │  │     └─ auto.guard.ts
│  │  ├─ handlers
│  │  │  ├─ encrypt.handler.ts
│  │  │  └─ metadata.handler.ts
│  │  ├─ interfaces
│  │  ├─ logs
│  │  │  └─ logs.middleware.ts
│  │  ├─ prisma
│  │  │  ├─ prisma.module.ts
│  │  │  └─ prisma.service.ts
│  │  ├─ redis
│  │  │  ├─ redis.module.ts
│  │  │  └─ redis.service.ts
│  │  └─ types
│  │     ├─ index.types..ts
│  │     └─ response.types.ts
│  ├─ main.ts
│  └─ module
│     ├─ criticality
│     │  ├─ analyses
│     │  │  ├─ analyses.controller.ts
│     │  │  ├─ analyses.module.ts
│     │  │  ├─ analyses.service.ts
│     │  │  └─ dto
│     │  │     ├─ create-analyses.dto.ts
│     │  │     └─ update-analyses.dto.ts
│     │  ├─ analyses-rules
│     │  │  ├─ analyses-rules.controller.ts
│     │  │  ├─ analyses-rules.module.ts
│     │  │  ├─ analyses-rules.service.ts
│     │  │  └─ dto
│     │  │     ├─ create-analyses-rules.dto.ts
│     │  │     └─ update-analyses-rules.dto.ts
│     │  ├─ criterion-classification
│     │  │  ├─ criterion-classification.controller.ts
│     │  │  ├─ criterion-classification.module.ts
│     │  │  ├─ criterion-classification.service.ts
│     │  │  └─ dto
│     │  │     ├─ create-criterion-classification.dto.ts
│     │  │     └─ update-criterion-classification.dto.ts
│     │  ├─ criterion-severity
│     │  │  ├─ criterion-severity.controller.ts
│     │  │  ├─ criterion-severity.module.ts
│     │  │  ├─ criterion-severity.service.ts
│     │  │  └─ dto
│     │  │     ├─ create-criterion-severity.dto.ts
│     │  │     └─ update-criterion-severity.dto.ts
│     │  ├─ criticality-assessment
│     │  │  ├─ criticality-assessment.controller.ts
│     │  │  ├─ criticality-assessment.module.ts
│     │  │  ├─ criticality-assessment.service.ts
│     │  │  └─ dto
│     │  │     ├─ create-criticality-assessment.dto.ts
│     │  │     └─ update-criticality-assessment.dto.ts
│     │  ├─ criticality-asset-maintenance
│     │  │  ├─ criticality-asset-maintenance.controller.ts
│     │  │  ├─ criticality-asset-maintenance.module.ts
│     │  │  ├─ criticality-asset-maintenance.service.ts
│     │  │  └─ dto
│     │  │     ├─ create-criticality-asset-maintenance.dto.ts
│     │  │     └─ update-criticality-asset-maintenance.dto.ts
│     │  ├─ criticality-system
│     │  │  ├─ criticality-system.controller.ts
│     │  │  ├─ criticality-system.module.ts
│     │  │  ├─ criticality-system.service.ts
│     │  │  └─ dto
│     │  │     ├─ create-criticality-system.dto.ts
│     │  │     └─ update-criticality-system.dto.ts
│     │  └─ failure-frequency
│     │     ├─ dto
│     │     │  ├─ create-failure-frequency.dto.ts
│     │     │  └─ update-failure-frequency.dto.ts
│     │     ├─ failure-frequency.controller.ts
│     │     ├─ failure-frequency.module.ts
│     │     └─ failure-frequency.service.ts
│     ├─ logistic
│     │  ├─ brand
│     │  │  ├─ brand.controller.ts
│     │  │  ├─ brand.module.ts
│     │  │  ├─ brand.service.ts
│     │  │  └─ dto
│     │  │     ├─ create-brand.dto.ts
│     │  │     └─ update-brand.dto.ts
│     │  ├─ entry
│     │  │  ├─ dto
│     │  │  │  ├─ create-entry.dto.ts
│     │  │  │  └─ update-entry.dto.ts
│     │  │  ├─ entry.controller.ts
│     │  │  ├─ entry.module.ts
│     │  │  └─ entry.service.ts
│     │  ├─ entry-detail
│     │  │  ├─ dto
│     │  │  │  ├─ create-entry-detail.dto.ts
│     │  │  │  └─ update-entry-detail.dto.ts
│     │  │  ├─ entry-detail.controller.ts
│     │  │  ├─ entry-detail.module.ts
│     │  │  └─ entry-detail.service.ts
│     │  ├─ for-use
│     │  │  ├─ dto
│     │  │  │  ├─ create-for-use.dto.ts
│     │  │  │  └─ update-for-use.dto.ts
│     │  │  ├─ for-use.controller.ts
│     │  │  ├─ for-use.module.ts
│     │  │  └─ for-use.service.ts
│     │  ├─ inventory
│     │  │  ├─ dto
│     │  │  │  ├─ create-inventory.dto.ts
│     │  │  │  └─ update-inventory.dto.ts
│     │  │  ├─ inventory.controller.ts
│     │  │  ├─ inventory.module.ts
│     │  │  └─ inventory.service.ts
│     │  ├─ inventory-component
│     │  │  ├─ dto
│     │  │  │  ├─ create-inventory-component.dto.ts
│     │  │  │  └─ update-inventory-component.dto.ts
│     │  │  ├─ inventory-component.controller.ts
│     │  │  ├─ inventory-component.module.ts
│     │  │  └─ inventory-component.service.ts
│     │  ├─ inventory-detail
│     │  │  ├─ dto
│     │  │  │  ├─ create-inventory-detail.dto.ts
│     │  │  │  └─ update-inventory-detail.dto.ts
│     │  │  ├─ inventory-detail.controller.ts
│     │  │  ├─ inventory-detail.module.ts
│     │  │  └─ inventory-detail.service.ts
│     │  ├─ model
│     │  │  ├─ dto
│     │  │  │  ├─ create-model.dto.ts
│     │  │  │  └─ update-model.dto.ts
│     │  │  ├─ model.controller.ts
│     │  │  ├─ model.module.ts
│     │  │  └─ model.service.ts
│     │  ├─ supplier
│     │  │  ├─ dto
│     │  │  │  ├─ create-supplier.dto.ts
│     │  │  │  └─ update-supplier.dto.ts
│     │  │  ├─ supplier.controller.ts
│     │  │  ├─ supplier.module.ts
│     │  │  └─ supplier.service.ts
│     │  └─ unit
│     │     ├─ dto
│     │     │  ├─ create-unit.dto.ts
│     │     │  └─ update-unit.dto.ts
│     │     ├─ unit.controller.ts
│     │     ├─ unit.module.ts
│     │     └─ unit.service.ts
│     ├─ maintenance
│     │  ├─ activity
│     │  │  ├─ activity.controller.ts
│     │  │  ├─ activity.module.ts
│     │  │  ├─ activity.service.ts
│     │  │  └─ dto
│     │  │     ├─ create-activity.dto.ts
│     │  │     └─ update-activity.dto.ts
│     │  ├─ activity-inventory
│     │  │  ├─ activity-inventory.controller.ts
│     │  │  ├─ activity-inventory.module.ts
│     │  │  ├─ activity-inventory.service.ts
│     │  │  └─ dto
│     │  │     ├─ create-activity-inventory.dto.ts
│     │  │     └─ update-activity-inventory.dto.ts
│     │  ├─ order
│     │  │  ├─ dto
│     │  │  │  ├─ create-order.dto.ts
│     │  │  │  └─ update-order.dto.ts
│     │  │  ├─ order.controller.ts
│     │  │  ├─ order.module.ts
│     │  │  └─ order.service.ts
│     │  ├─ order-activity
│     │  │  ├─ dto
│     │  │  │  ├─ create-order-activity.dto.ts
│     │  │  │  └─ update-order-activity.dto.ts
│     │  │  ├─ order-activity.controller.ts
│     │  │  ├─ order-activity.module.ts
│     │  │  └─ order-activity.service.ts
│     │  ├─ order-worker
│     │  │  ├─ dto
│     │  │  │  ├─ create-order-worker.dto.ts
│     │  │  │  └─ update-order-worker.dto.ts
│     │  │  ├─ order-worker.controller.ts
│     │  │  ├─ order-worker.module.ts
│     │  │  └─ order-worker.service.ts
│     │  ├─ report
│     │  │  ├─ dto
│     │  │  │  ├─ create-report.dto.ts
│     │  │  │  └─ update-report.dto.ts
│     │  │  ├─ report.controller.ts
│     │  │  ├─ report.module.ts
│     │  │  └─ report.service.ts
│     │  ├─ report-activity
│     │  │  ├─ dto
│     │  │  │  ├─ create-report-activity.dto.ts
│     │  │  │  └─ update-report-activity.dto.ts
│     │  │  ├─ report-activity.controller.ts
│     │  │  ├─ report-activity.module.ts
│     │  │  └─ report-activity.service.ts
│     │  ├─ report-activity-inventory
│     │  │  ├─ dto
│     │  │  │  ├─ create-report-activity-inventory.dto.ts
│     │  │  │  └─ update-report-activity-inventory.dto.ts
│     │  │  ├─ report-activity-inventory.controller.ts
│     │  │  ├─ report-activity-inventory.module.ts
│     │  │  └─ report-activity-inventory.service.ts
│     │  ├─ request
│     │  │  ├─ dto
│     │  │  │  ├─ create-request.dto.ts
│     │  │  │  └─ update-request.dto.ts
│     │  │  ├─ request.controller.ts
│     │  │  ├─ request.module.ts
│     │  │  └─ request.service.ts
│     │  └─ request-order
│     │     ├─ dto
│     │     │  ├─ create-request-order.dto.ts
│     │     │  └─ update-request-order.dto.ts
│     │     ├─ request-order.controller.ts
│     │     ├─ request-order.module.ts
│     │     └─ request-order.service.ts
│     ├─ taxonomy
│     │  ├─ asset-maintenance
│     │  │  ├─ asset-maintenance.controller.ts
│     │  │  ├─ asset-maintenance.module.ts
│     │  │  ├─ asset-maintenance.service.ts
│     │  │  └─ dto
│     │  │     ├─ create-asset-maintenance.dto.ts
│     │  │     └─ update-asset-maintenance.dto.ts
│     │  ├─ business-category
│     │  │  ├─ business-category.controller.ts
│     │  │  ├─ business-category.module.ts
│     │  │  ├─ business-category.service.ts
│     │  │  └─ dto
│     │  │     ├─ create-business-category.dto.ts
│     │  │     └─ update-business-category.dto.ts
│     │  ├─ component
│     │  │  ├─ component.controller.ts
│     │  │  ├─ component.module.ts
│     │  │  ├─ component.service.ts
│     │  │  └─ dto
│     │  │     ├─ create-component.dto.ts
│     │  │     └─ update-component.dto.ts
│     │  ├─ facilities
│     │  │  ├─ dto
│     │  │  │  ├─ create-facilities.dto.ts
│     │  │  │  └─ update-facilities.dto.ts
│     │  │  ├─ facilities.controller.ts
│     │  │  ├─ facilities.module.ts
│     │  │  └─ facilities.service.ts
│     │  ├─ industry
│     │  │  ├─ dto
│     │  │  │  ├─ create-industry.dto.ts
│     │  │  │  └─ update-industry.dto.ts
│     │  │  ├─ industry.controller.ts
│     │  │  ├─ industry.module.ts
│     │  │  └─ industry.service.ts
│     │  ├─ plant
│     │  │  ├─ dto
│     │  │  │  ├─ create-plant.dto.ts
│     │  │  │  └─ update-plant.dto.ts
│     │  │  ├─ plant.controller.ts
│     │  │  ├─ plant.module.ts
│     │  │  └─ plant.service.ts
│     │  ├─ section
│     │  │  ├─ dto
│     │  │  │  ├─ create-section.dto.ts
│     │  │  │  └─ update-section.dto.ts
│     │  │  ├─ section.controller.ts
│     │  │  ├─ section.module.ts
│     │  │  └─ section.service.ts
│     │  ├─ subsystem
│     │  │  ├─ dto
│     │  │  │  ├─ create-subsystem.dto.ts
│     │  │  │  └─ update-subsystem.dto.ts
│     │  │  ├─ subsystem.controller.ts
│     │  │  ├─ subsystem.module.ts
│     │  │  └─ subsystem.service.ts
│     │  └─ system
│     │     ├─ dto
│     │     │  ├─ create-system.dto.ts
│     │     │  └─ update-system.dto.ts
│     │     ├─ system.controller.ts
│     │     ├─ system.module.ts
│     │     └─ system.service.ts
│     └─ user
│        ├─ auth
│        │  ├─ auth.controller.ts
│        │  ├─ auth.module.ts
│        │  ├─ auth.service.ts
│        │  └─ dto
│        │     ├─ create-auth.dto.ts
│        │     └─ create-refresh.dto.ts
│        ├─ credential
│        │  ├─ credential.controller.ts
│        │  ├─ credential.module.ts
│        │  ├─ credential.service.ts
│        │  └─ dto
│        │     ├─ create-credential.dto.ts
│        │     └─ update-credential.dto.ts
│        ├─ session
│        │  ├─ dto
│        │  │  └─ create-session.dto.ts
│        │  ├─ session.controller.ts
│        │  ├─ session.module.ts
│        │  └─ session.service.ts
│        └─ worker
│           ├─ dto
│           │  ├─ create-worker.dto.ts
│           │  └─ update-worker.dto.ts
│           ├─ worker.controller.ts
│           ├─ worker.module.ts
│           └─ worker.service.ts
├─ tsconfig.build.json
└─ tsconfig.json

```
