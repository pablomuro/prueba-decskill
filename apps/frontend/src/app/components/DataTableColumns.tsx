import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Box, Button, LinearProgress } from '@mui/material';
import { AsteroidData } from '@monorepo/types';
import { useAddFavorites } from '../hooks/useFavorites';

function RenderCellComponent(params: GridRenderCellParams<AsteroidData>) {
  const { isFetchingFav, id, addAsteroidToFavorites } = useAddFavorites();

  return isFetchingFav && params.row.id === id ? (
    <Box sx={{ width: '100%' }}>
      <LinearProgress />
    </Box>
  ) : (
    <strong>
      <Button
        variant="contained"
        size="small"
        style={{ marginLeft: 16 }}
        tabIndex={params.hasFocus ? 0 : -1}
        onClick={(e) => {
          e.stopPropagation();
          addAsteroidToFavorites(params.row);
        }}
      >
        Add to Favorites
      </Button>
    </strong>
  );
}

export const dataTableColumns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'Neo Id',
    flex: 1,
    minWidth: 150,
  },
  {
    field: 'name',
    headerName: 'Name',
    flex: 1,
    minWidth: 50,
  },
  {
    field: 'absolute_magnitude_h',
    headerName: 'Absolute Magnitude',
    flex: 1,
    minWidth: 50,
  },
  {
    field: 'is_potentially_hazardous_asteroid',
    headerName: 'Is Potentially Hazardous',
    valueGetter: ({ value }) => (value && value === true ? 'YES' : 'NO'),
    flex: 1,
    minWidth: 50,
    align: 'center',
  },
  {
    field: 'fav',
    headerName: 'Action',
    flex: 1,
    minWidth: 50,

    renderCell: (params: GridRenderCellParams<AsteroidData>) =>
      RenderCellComponent(params),
  },
];
