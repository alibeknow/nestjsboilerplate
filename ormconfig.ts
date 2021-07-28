import './src/boilerplate.polyfill';

import { SnakeNamingStrategy } from './src/snake-naming.strategy';

module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST || '127.0.0.1',
  port: +process.env.DB_PORT || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_DATABASE || 'postgres',
  namingStrategy: new SnakeNamingStrategy(),
  entities: ['src/modules/**/*.entity{.ts,.js}'],
  migrations: ['src/migrations/*{.ts,.js}'],
  synchronize:true
};
