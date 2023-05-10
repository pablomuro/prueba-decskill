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
    const { startDate, endDate }: ApiFilter = request.body;

    const { data, status } = await axios.get<NasaApiResponse>(
      getFeedApiUrl({ startDate, endDate })
    );

    if (status !== 200) res.status(status).json(NOT_FOUND_MSG);

    const { near_earth_objects = {}, element_count = 0, links = {} } = data;

    const asteroidsArray = Object.values(near_earth_objects).flat();

    if (!asteroidsArray) res.status(400).json(NOT_FOUND_MSG);

    return res.json({ data: asteroidsArray, count: element_count, links });
  }

  public async lookUp(request: Request, res: Response) {
    // TODO - get id from request, search fav do banco e pesquisar neoId do asteroid salvo
    const neoId = this.t();
    const url = getLookupApiUrl(neoId);
    const { data, status } = await axios.get<NasaApiResponse>(url);

    return res.json(data);
  }

  private t() {
    return 3542519;
  }

  async create(request: Request) {
    const { asteroid: asteroidName } = request.body;

    validateText(asteroidName);

    const asteroid = Object.assign(new AsteroidFavorite(), {
      asteroidName,
    });

    return asteroid.save();
  }

  async update(request: Request) {
    const { number, asteroid: asteroidName } = request.body;
    validateId(parseInt(number, 10));
    validateText(asteroidName);

    const id = parseInt(number, 10);

    const asteroid = await AsteroidFavorite.findOneBy({ id });

    if (!asteroid) {
      throw Error(NOT_FOUND_MSG);
    }

    asteroid.asteroidName = asteroidName;
    await asteroid.save();

    return asteroid;
  }

  async delete(request: Request) {
    const { number } = request.body;
    validateId(parseInt(number, 10));

    const id = parseInt(number, 10);

    const asteroid = await AsteroidFavorite.findOneBy({ id });

    if (!asteroid) {
      throw Error(NOT_FOUND_MSG);
    }

    await asteroid.remove();

    return 'Deleted';
  }
}
