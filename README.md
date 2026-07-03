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
├─ eslint.config.mjs
├─ nest-cli.json
├─ package-lock.json
├─ package.json
├─ prisma
│  ├─ migrations
│  │  ├─ 20260528012831_init
│  │  │  └─ migration.sql
│  │  ├─ 20260528060053_fix_dni_unique
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
│  │  ├─ guards
│  │  │  ├─ auth
│  │  │  │  └─ auth.guard.ts
│  │  │  └─ auto
│  │  │     └─ auto.guard.ts
│  │  ├─ handlers
│  │  │  ├─ encrypt.handler.ts
│  │  │  └─ metadata.handler.ts
│  │  ├─ interfaces
│  │  └─ types
│  │     └─ response.types.ts
│  ├─ main.ts
│  ├─ module
│  │  ├─ auth
│  │  │  ├─ auth.controller.ts
│  │  │  ├─ auth.module.ts
│  │  │  ├─ auth.service.ts
│  │  │  └─ dto
│  │  │     └─ create-auth.dto.ts
│  │  ├─ session
│  │  │  ├─ dto
│  │  │  │  └─ create-session.dto.ts
│  │  │  ├─ session.controller.ts
│  │  │  ├─ session.module.ts
│  │  │  └─ session.service.ts
│  │  └─ worker
│  │     ├─ dto
│  │     │  ├─ create-worker.dto.ts
│  │     │  ├─ response-worker.dto.ts
│  │     │  └─ update-worker.dto.ts
│  │     ├─ worker.controller.ts
│  │     ├─ worker.module.ts
│  │     └─ worker.service.ts
│  └─ prisma
│     ├─ prisma.module.ts
│     └─ prisma.service.ts
├─ tsconfig.build.json
└─ tsconfig.json

```
