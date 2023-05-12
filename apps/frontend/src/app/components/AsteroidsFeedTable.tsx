import { ApiListResponse } from '@monorepo/types';
import { CircularProgress } from '@mui/material';
import { DataGrid, GridEventListener } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useDateFilter, useFilter } from '../hooks/useDataFilter';

import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { useFetchData } from '../hooks/useFetchData';
import { feedTableColumns } from './DataTableColumns';

export function AsteroidsFeedTable() {
  const { setDateFilter, getParsedDateFilter } = useDateFilter();
  const { isToFilter, setIsToFilter } = useFilter();

  const [filterDateString, setFilterDateString] = useState('');
  const [url, setUrl] = useState('/api');
  const { startDate, endDate } = getParsedDateFilter();

  const navigate = useNavigate();

  const {
    data: apiResponse,
    error,
    isFetching,
  } = useFetchData<ApiListResponse>({
    url,
  });

  const asteroidsList = apiResponse?.data;
  const { self = null } = apiResponse?.links ?? {};

  useEffect(() => {
    if (self && self !== filterDateString) {
      setFilterDateString(self);
    }
  }, [self, filterDateString, setFilterDateString]);

  useEffect(() => {
    if (!startDate && !endDate && filterDateString) {
      const [startDate, endDate] =
        filterDateString.match(/\d{4}-\d{2}-\d{2}/g) || [];
      if (startDate && endDate)
        setDateFilter({
          startDate: dayjs(new Date(startDate)),
          endDate: dayjs(new Date(endDate)),
        });
    }
  }, [endDate, filterDateString, setDateFilter, startDate]);

  useEffect(() => {
    if (isToFilter) {
      setIsToFilter(false);
      const url = !(startDate && endDate)
        ? '/api'
        : `/api?startDate=${startDate}&endDate=${endDate}`;
      setUrl(url);
    }
  }, [isToFilter, setIsToFilter, startDate, endDate]);

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
        columns={feedTableColumns}
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
