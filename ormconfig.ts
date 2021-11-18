import './src/boilerplate.polyfill';

import { SnakeNamingStrategy } from './src/snake-naming.strategy';

module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST || '10.0.124.132',
  port: +process.env.DB_PORT || 5432,
  username: process.env.DB_USERNAME || 'kaztoll_user',
  password: process.env.DB_PASSWORD || 'VW9z7FNcAv',
  database: process.env.DB_DATABASE || 'kaztoll_enterprise',
  namingStrategy: new SnakeNamingStrategy(),
  entities: ['src/modules/**/*.entity{.ts,.js}'],
  migrations: ['src/migrations/*{.ts,.js}'],
  synchronize:true,
  logging:false
};
