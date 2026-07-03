import {
  Inject,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { Redis } from 'ioredis';
import 'dotenv/config';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  constructor(@Inject('REDIS_CLIENT') private readonly redis: Redis) {}

  private client!: Redis;
  private prefix = process.env.REDIS_PREFIX;

  async onModuleInit() {
    try {
      this.client = new Redis({
        host: process.env.REDIS_HOST,
        port: 6379,
        password: process.env.REDIS_PASSWORD,
        db: 0,
      });

      const now = new Date();

      await this.client.set('test:key', 'Redis is ON at: ' + now, 'EX', 720);
      const value = await this.client.get('test:key');

      const actual = new Date();

      const diffMs = actual.getTime() - now.getTime();

      console.log(`message -> ${value}, time to create and read: ${diffMs} ms`);
    } catch (error) {
      console.log(error);
    }
  }

  async onModuleDestroy() {
    await this.redis.quit();
  }

  async setKey(
    key: string,
    value: string | number | Record<string, any> | Record<string, any>[],
    ttlMinutes: number = parseInt(process.env.REDIS_TTL ?? '60'),
  ): Promise<boolean> {
    try {
      //Obtiene el tipo de valor, si es string o si es objeto lo pasa a string
      let stringValue;

      if (typeof value === 'string') {
        stringValue = value;
      } else {
        stringValue = JSON.stringify(value);
      }

      //El ttl ya esta configurado con anticipación
      if (ttlMinutes) {
        //Parámetro "EX" indica los segundos que durara la llave
        //"PX" es milisegundos
        await this.redis.set(key, stringValue, 'EX', ttlMinutes * 60);
      } else {
        //Esto crea para siempre, hasta que se apague el servidor.
        await this.redis.set(key, stringValue);
      }

      return true;
    } catch (error) {
      return false;
    }
  }

  // EL T es como un tipo genérico, es para funciones que pueden tener varios tipos de salida
  async getKey<T = any>(key: string): Promise<T | null> {
    const value = await this.redis.get(key);
    if (!value) return null;
    try {
      return JSON.parse(value) as T;
    } catch {
      return value as unknown as T;
    }
  }

  //Funciona general para consultar si existe y guardar,
  //tener cuidado con el nombre a guardar,
  //en caso de que sea muy especifico
  //  el nombre hacerlo de manera manual

  //El T puede ser cualquiera que tenga devuelva

  async generalFunctionRedis<
    T extends string | number | Record<string, any> | Record<string, any>[],
  >(
    key: string,
    subKey: string,
    param: string | Record<string, any> | null,
    //Invocas un callback con promesa T
    callback: () => Promise<T>,
    ttl: number = 1,
  ): Promise<T | undefined> {
    try {
      let paramValue = '';

      //Valida el valor param
      if (param !== undefined && param !== null && param !== '') {
        if (typeof param === 'string') {
          paramValue = '?' + param;
        } else {
          paramValue = '?' + JSON.stringify(param);
        }
      }

      //Se guarda el identificador de la cadena
      const keyName = `${this.prefix}:${key}:${subKey}${paramValue}`;

      const keyValue = await this.getKey(keyName);

      //Valida si existe en redis
      if (keyValue) {
        //Si existe solamente devuelve
        console.log('Was read ');
        return keyValue as T;
      } else {
        //invocas el callback
        const requestValue = await callback();
        const setKeyValue = await this.setKey(keyName, requestValue, ttl);

        await this.addBranch(key, keyName);
        console.log('Was request');

        if (!setKeyValue) {
          throw new Error();
        } else {
          return requestValue;
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  async del(key: string): Promise<void> {
    await this.redis.del(key);
  }

  async addBranch(branch: string, keyName: string) {
    const branchIndex = `${this.prefix}:${branch}*index`;
    await this.redis.sadd(branchIndex, keyName);
  }

  async deleteBranch(branch: string): Promise<void> {
    const branchIndex = `${this.prefix}:${branch}*index`;

    //Elimina toda la rama de redis
    const keys = await this.redis.smembers(branchIndex);
    await this.redis.unlink(...keys);
    await this.redis.del(branchIndex);
  }

  async deleteBranchBoolean(branch: string): Promise<boolean> {
    try {
      await this.deleteBranch(branch);
      return true;
    } catch (error) {
      return false;
    }
  }

  //Devuelve true o false
  async exists(key: string): Promise<boolean> {
    const result = await this.redis.exists(key);
    return result === 1;
  }

  // método para acceder al cliente nativo si necesitas comandos avanzados
  getClient(): Redis {
    return this.redis;
  }
}
