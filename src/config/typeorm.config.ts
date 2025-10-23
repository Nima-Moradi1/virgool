import { join } from 'path';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export function TypeOrmConfig(): TypeOrmModuleOptions {
  const { DB_HOST, DB_NAME, DB_PASSWORD, DB_USERNAME, DB_PORT } = process.env;
  return {
    type: 'postgres',
    host: DB_HOST,
    port: Number(DB_PORT ?? 5432),
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    autoLoadEntities: true,
    synchronize: true,
    entities: [join(__dirname, '..', '**', '*.entity.{ts,js}')],
  };
}
