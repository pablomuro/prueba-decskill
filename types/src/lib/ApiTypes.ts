import { AsteroidData, PaginationLinks } from './NasaApiResponseTypes';
import { Dayjs } from 'dayjs';

export type ApiFilter = {
  startDate?: Dayjs | null | string;
  endDate?: Dayjs | null | string;
};

export type ApiListResponse = {
  data: AsteroidData[];
  count: number;
  links: PaginationLinks;
};
