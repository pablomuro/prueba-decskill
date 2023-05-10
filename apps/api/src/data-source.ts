import 'reflect-metadata';

import { DataSource } from 'typeorm';

import { AsteroidFavorite } from './entity/AsteroidFavorite';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'database.sqlite',
  synchronize: true,
  logging: false,
  entities: [AsteroidFavorite],
  migrations: [],
  subscribers: [],
});
