import { CircularProgress } from '@mui/material';
import { DataGrid, GridEventListener } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import { AsteroidFavoriteType } from '@monorepo/types';
import { useFetchData } from '../hooks/useFetchData';
import { favTableColumns } from './DataTableColumns';

export function AsteroidFavoritesTable() {
  const navigate = useNavigate();

  const {
    data: asteroidsList,
    error,
    isFetching,
  } = useFetchData<AsteroidFavoriteType[]>({
    url: '/api/favorite',
    initialData: [],
  });

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

  const handleEvent: GridEventListener<'rowClick'> = (params, event) => {
    event.stopPropagation();
    navigate(`/detail/${params.row.id}`);
  };

  return (
    <div style={{ minHeight: 300, width: '100%' }}>
      <DataGrid
        rows={asteroidsList}
        columns={favTableColumns}
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
