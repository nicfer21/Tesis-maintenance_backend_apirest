import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  /* De manera obligatoria poner siempre el constructor y el super para conectarlo al adaptador de PG */
  constructor() {
    const connectionString = process.env.DATABASE_URL;

    if (!connectionString) {
      throw new Error(
        'DATABASE_URL no está definida en las variables de entorno',
      );
    }

    const adapter = new PrismaPg({
      host: process.env.DATABASE_HOST,
      user: process.env.DATABASE_USER,
      database: process.env.DATABASE_DB,
      port: process.env.DATABASE_PORT ? +process.env.DATABASE_PORT : 5432,
      password: process.env.DATABASE_PASSWORD,
    });

    super({ adapter });
  }

  async onModuleInit() {
    try {
      await this.$connect();
      await this.$queryRaw`Select 1+1;`;
      console.log('Correct connection to Postgres Database');
    } catch (error) {
      console.log({ message: 'Error to connect to database', error: error });
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
