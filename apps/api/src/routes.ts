import { AsteroidController } from './controller/AsteroidController';

const AsteroidRoutes = [
  {
    method: 'get',
    route: '/',
    action: 'index',
    controller: AsteroidController,
  },
  {
    method: 'get',
    route: '/lookUp',
    action: 'lookUp',
    controller: AsteroidController,
  },
  {
    method: 'post',
    route: '/',
    action: 'create',
    controller: AsteroidController,
  },
  {
    method: 'put',
    route: '/',
    action: 'update',
    controller: AsteroidController,
  },
  {
    method: 'delete',
    route: '/',
    action: 'delete',
    controller: AsteroidController,
  },
];

export const AppRoutes = [...AsteroidRoutes];
