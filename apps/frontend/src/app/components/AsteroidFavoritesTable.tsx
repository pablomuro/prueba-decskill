import { CircularProgress } from '@mui/material';
import { DataGrid, GridColDef, GridEventListener } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { fetchParser } from '../../helpers/fetchMiddlaware';
import { useNavigate } from 'react-router-dom';

const favColumns: GridColDef[] = [
  {
    field: 'asteroidNeoId',
    headerName: 'Neo Id',
    flex: 1,
    minWidth: 150,
  },
  {
    field: 'asteroidName',
    headerName: 'Name',
    flex: 1,
    minWidth: 50,
  },
  {
    field: 'absoluteMagnitudeH',
    headerName: 'Absolute Magnitude',
    flex: 1,
    minWidth: 50,
  },
  {
    field: 'isPotentiallyHazardousAsteroid',
    headerName: 'Is Potentially Hazardous',
    valueGetter: ({ value }) => (value && value === true ? 'YES' : 'NO'),
    flex: 1,
    minWidth: 50,
  },
];

export function AsteroidFavoritesTable() {
  const [asteroidsList, setAsteroidsList] = useState<any[]>([]);

  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const navigate = useNavigate();

  const fetchApiData = () => {
    fetch('/api/favorite')
      .then(fetchParser)
      .then((res: any[]) => {
        console.log(res);
        setAsteroidsList(() => res);
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

  const handleEvent: GridEventListener<'rowClick'> = (params, event) => {
    event.stopPropagation();
    navigate(`/detail/${params.row.id}`);
  };

  return (
    <div style={{ minHeight: 300, width: '100%' }}>
      <DataGrid
        rows={asteroidsList}
        columns={favColumns}
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
