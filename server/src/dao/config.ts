import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

const DB = process.env.DB || 'linky';
const DB_HOST = process.env.DB_HOST || '127.0.0.1';
const DB_PORT = parseInt(process.env.DB_PORT || '3306', 10);
const DB_USER = process.env.DB_USER || '';
const DB_PASS = process.env.DB_PASS || '';

export default (): MysqlConnectionOptions => ({
  type: 'mariadb',
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USER,
  password: DB_PASS,
  database: DB,
  synchronize: true,
  logging: false,
  entities: ['src/entity/**/*'],
  migrations: ['src/migration/**/*'],
  subscribers: ['src/subscriber/**/*'],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber'
  }
});
