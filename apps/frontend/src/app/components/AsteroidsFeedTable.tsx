import {
  AsteroidData,
  ApiListResponse,
  PaginationLinks,
  ApiFilter,
} from '@monorepo/types';
import { CircularProgress } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { fetchParser } from '../../helpers/fetchMiddlaware';
import { useDateFilter, useFilter } from '../hooks/useDataFilter';
import { GridEventListener } from '@mui/x-data-grid';

import dayjs from 'dayjs';
import { dataTableColumns } from './DataTableColumns';
import { useNavigate } from 'react-router-dom';

export function AsteroidsFeedTable() {
  const [asteroidsList, setAsteroidsList] = useState<AsteroidData[]>([]);
  const [paginationLinks, setPaginationLinks] = useState<PaginationLinks>({
    self: '',
    next: '',
    previous: '',
  });

  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const { setDateFilter, getParsedDateFilter } = useDateFilter();

  const { isToFilter, setIsToFilter } = useFilter();

  const navigate = useNavigate();

  const fetchApiData = (filter?: ApiFilter) => {
    const { startDate = null, endDate = null } = filter || {};
    const url = !(startDate && endDate)
      ? '/api'
      : `/api?startDate=${startDate}&endDate=${endDate}`;

    fetch(url)
      .then(fetchParser)
      .then((res: ApiListResponse) => {
        setAsteroidsList(() => res.data);
        setPaginationLinks(() => res.links);
        setIsFetching(false);
      })
      .catch((err) => {
        setError(err);
        setIsFetching(false);
      });
  };

  useEffect(() => {
    fetchApiData();
  }, []);

  useEffect(() => {
    if (paginationLinks.self) {
      const [startDate, endDate] =
        paginationLinks.self.match(/\d{4}-\d{2}-\d{2}/g) || [];
      if (startDate && endDate)
        setDateFilter({
          startDate: dayjs(new Date(startDate)),
          endDate: dayjs(new Date(endDate)),
        });
    }
  }, [paginationLinks.self, setDateFilter]);

  useEffect(() => {
    if (isToFilter) {
      setIsToFilter(false);
      setIsFetching(true);
      const dateFilter = getParsedDateFilter();

      fetchApiData(dateFilter);
    }
  }, [isToFilter, setIsToFilter, getParsedDateFilter]);

  const handleEvent: GridEventListener<'rowClick'> = (params, event) => {
    event.stopPropagation();
    navigate(`/detail`, { state: params.row });
  };

  if (isFetching) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress color="inherit" />
      </div>
    );
  }
  if (error) {
    setError(null);
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <h1>{error.message}</h1>
      </div>
    );
  }

  return (
    <div style={{ minHeight: 300, width: '100%' }}>
      <DataGrid
        rows={asteroidsList}
        columns={dataTableColumns}
        loading={isFetching}
        onRowClick={handleEvent}
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        pageSizeOptions={[10]}
      />
    </div>
  );
}
