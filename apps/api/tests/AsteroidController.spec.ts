import { describe, expect, test } from '@jest/globals';
import { expressAppSetup, app } from '../src/app';
import * as request from 'supertest';
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

const URL_PATH = '/asteroid';

describe('AsteroidController.spec test', () => {
  beforeAll(async () => {
    await expressAppSetup(AppDataSource);
  });

  test('Test get method', async () => {
    const res = await request(app).get(`${URL_PATH}`);

    const { body } = res;
    expect(res.statusCode).toBe(200);
    expect(typeof body).toBe('string');
  });

  test('Test get method with a valid parameter', async () => {
    let res = await request(app).get(`${URL_PATH}`);

    let { body } = res;
    expect(res.statusCode).toBe(200);
    expect(typeof body).toBe('string');

    res = await request(app).get(`${URL_PATH}`);

    body = res.body;

    expect(res.statusCode).toBe(200);
    expect(typeof body).toBe('string');
  });

  test('Test create new asteroid', async () => {
    const res = await request(app)
      .post(`${URL_PATH}`)
      .send({ asteroid: 'New Test asteroid' });

    const { body } = res;

    expect(res.statusCode).toBe(200);
    expect(body.asteroidText).not.toBe(undefined);
    expect(body.asteroidText).toBe('New Test asteroid');
  });

  test('Test create new asteroid with invalid param', async () => {
    const res = await request(app).post(`${URL_PATH}`).send({ asteroid: '' });

    const { body } = res;

    expect(res.statusCode).toBe(400);
    expect(body).toBe('Invalid asteroid Text');
  });

  test('Test edit asteroid', async () => {
    let res = await request(app)
      .post(`${URL_PATH}`)
      .send({ asteroid: 'New Test asteroid' });

    const {
      body: { id },
    } = res;

    res = await request(app)
      .put(`${URL_PATH}`)
      .send({ number: id, asteroid: 'Edited Test asteroid' });

    const { body } = res;

    expect(res.statusCode).toBe(200);
    expect(body.id).toBe(id);
    expect(body.asteroidText).toBe('Edited Test asteroid');
  });

  test('Test edit asteroid with invalid param', async () => {
    let res = await request(app)
      .put(`${URL_PATH}`)
      .send({ number: '', asteroid: 'Edited Test asteroid' });

    let { body } = res;

    expect(res.statusCode).toBe(400);
    expect(body).toBe('Invalid Id');

    res = await request(app)
      .put(`${URL_PATH}`)
      .send({ number: -1, asteroid: 'Edited Test asteroid' });

    body = res.body;

    expect(res.statusCode).toBe(400);
    expect(body).toBe('Invalid Id');

    res = await request(app)
      .put(`${URL_PATH}`)
      .send({ number: 1, asteroid: '' });

    body = res.body;

    expect(res.statusCode).toBe(400);
    expect(body).toBe('Invalid asteroid Text');
  });

  test('Test delete asteroid', async () => {
    let res = await request(app)
      .post(`${URL_PATH}`)
      .send({ asteroid: 'New Test asteroid' });

    const {
      body: { id },
    } = res;

    res = await request(app).delete(`${URL_PATH}`).send({ number: id });

    const { body } = res;

    expect(res.statusCode).toBe(200);
    expect(body).toBe('asteroid Removed');
  });

  test('Test delete asteroid with invalid param', async () => {
    let res = await request(app).delete(`${URL_PATH}`).send({ number: '' });

    let { body } = res;

    expect(res.statusCode).toBe(400);
    expect(body).toBe('Invalid Id');

    res = await request(app).delete(`${URL_PATH}`).send({ number: 999 });

    body = res.body;

    expect(res.statusCode).toBe(400);
    expect(body).toBe('Not Found');
  });
});
