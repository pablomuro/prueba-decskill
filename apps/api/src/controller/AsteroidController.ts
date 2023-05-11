import { mockData } from './../../mockData';
import axios from 'axios';
import type { Request, Response } from 'express';
import { AsteroidFavorite } from '../entity/AsteroidFavorite';
import { NOT_FOUND_MSG } from '../helpers/constants';
import { validateId, validateText } from '../helpers/validators';
import type { NasaApiResponse, ApiFilter } from '@monorepo/types';

const API_BASE_URL = process.env.API_BASE_URL ?? null;
const API_KEY = process.env.API_KEY ?? 'DEMO_KEY';

const getFeedApiUrl = ({ startDate, endDate }: ApiFilter) => {
  const apiBaseUrl = `${API_BASE_URL}feed`;

  if (!startDate || !endDate) return `${apiBaseUrl}?api_key=${API_KEY}`;

  return `${apiBaseUrl}?api_key=${API_KEY}&start_date=${startDate}&end_date=${startDate}`;
};

const getLookupApiUrl = (neoId: number) => {
  const apiBaseUrl = `${API_BASE_URL}neo/${neoId}`;
  return `${apiBaseUrl}?api_key=${API_KEY}`;
};

export class AsteroidController {
  public async index(request: Request, res: Response) {
    const { startDate, endDate }: ApiFilter = request.query;

    const { data, status } = await axios.get<NasaApiResponse>(
      getFeedApiUrl({ startDate, endDate })
    );

    if (status !== 200) return res.status(status).json(NOT_FOUND_MSG);

    const { near_earth_objects = {}, element_count = 0, links = {} } = data;

    const asteroidsArray = Object.values(near_earth_objects).flat();

    if (!asteroidsArray) res.status(400).json(NOT_FOUND_MSG);

    return res.json({ data: asteroidsArray, count: element_count, links });
  }

  async listFavorites(request: Request, res: Response) {
    const asteroidList = await AsteroidFavorite.find();

    res.json(asteroidList);
  }
  async createFavorite(request: Request, res: Response) {
    const {
      id,
      name,
      absolute_magnitude_h,
      is_potentially_hazardous_asteroid,
    } = request.body;

    validateId(Number(id));
    validateText(name);
    validateText(absolute_magnitude_h);

    const asteroid = await AsteroidFavorite.findOneBy({ asteroidNeoId: id });

    if (asteroid) throw false;

    const newAsteroid = Object.assign(new AsteroidFavorite(), {
      asteroidName: name,
      asteroidNeoId: id,
      absoluteMagnitudeH: absolute_magnitude_h,
      isPotentiallyHazardousAsteroid: is_potentially_hazardous_asteroid,
    });

    newAsteroid.save();

    res.json(true);
  }

  public async getFavorite(request: Request, res: Response) {
    const { id } = request.params;

    validateId(Number(id));

    const asteroid = await AsteroidFavorite.findOneBy({
      id: Number(id),
    });

    if (!asteroid) throw Error(NOT_FOUND_MSG);

    const { data, status } = await axios.get<NasaApiResponse>(
      getLookupApiUrl(asteroid.asteroidNeoId)
    );

    if (status !== 200) return res.status(status).json(NOT_FOUND_MSG);

    return res.json(data);
  }
}
