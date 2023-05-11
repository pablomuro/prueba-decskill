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
    route: '/favorite',
    action: 'listFavorites',
    controller: AsteroidController,
  },
  {
    method: 'get',
    route: '/favorite/:id',
    action: 'getFavorite',
    controller: AsteroidController,
  },
  {
    method: 'post',
    route: '/addAsteroidToFavorite',
    action: 'createFavorite',
    controller: AsteroidController,
  },
];

export const AppRoutes = [...AsteroidRoutes];
