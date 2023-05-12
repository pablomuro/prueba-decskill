import { describe, expect, test } from '@jest/globals';
import { expressAppSetup, app } from '../src/app';
import request from 'supertest';
import { DataSource } from 'typeorm';
import { AsteroidFavorite } from '../src/entity/AsteroidFavorite';
import 'reflect-metadata';

const AppDataSource: DataSource = new DataSource({
  type: 'sqlite',
  database: ':memory:',
  synchronize: true,
  logging: false,
  entities: [AsteroidFavorite],
  migrations: [],
  subscribers: [],
});

const BASE_URL_PATH = '/api';

describe('AsteroidController.spec test', () => {
  beforeAll(async () => {
    await expressAppSetup(AppDataSource);
  });

  test('Test get asteroid feed list', async () => {
    const res = await request(app).get(`${BASE_URL_PATH}`);

    const {
      body: { data },
    } = res;
    expect(res.statusCode).toBe(200);
    expect(data).toBeDefined();
  });

  test('Test get asteroid feed list with valid filter', async () => {
    const res = await request(app).get(
      `${BASE_URL_PATH}?start_date=2015-09-07&end_date=2015-09-08`
    );

    const { body: data } = res;
    expect(res.statusCode).toBe(200);
    expect(data).toBeDefined();
  });

  test('Test create new asteroid favorite', async () => {
    const res = await request(app)
      .post(`${BASE_URL_PATH}/addAsteroidToFavorite`)
      .send({
        id: '2465633',
        name: '465633 (2009 JR5)',
        absolute_magnitude_h: '20.48',
        is_potentially_hazardous_asteroid: true,
      });

    const { body } = res;

    expect(res.statusCode).toBe(200);
    expect(body).toBeTruthy();
  });

  test('Test create new asteroid favorite with same id', async () => {
    const res = await request(app)
      .post(`${BASE_URL_PATH}/addAsteroidToFavorite`)
      .send({
        id: '2465633',
        name: '465633 (2009 JR5)',
        absolute_magnitude_h: '20.48',
        is_potentially_hazardous_asteroid: true,
      });

    const { body } = res;

    expect(res.statusCode).toBe(400);
    expect(body).toBeFalsy();
  });

  test('Test get favorite details', async () => {
    const res = await request(app).get(`${BASE_URL_PATH}/favorite/1`);

    const {
      body: { id, name },
    } = res;

    expect(res.statusCode).toBe(200);
    expect(id).toBe(id);
    expect(name).toBe('465633 (2009 JR5)');
  });

  test('Test get favorite details with invalid id', async () => {
    const res = await request(app).get(`${BASE_URL_PATH}/favorite/999`);
    const { body } = res;

    expect(res.statusCode).toBe(400);
    expect(body).toBe('Not Found');
  });
});
