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

const columnDefaults = {
  field: '',
  headerName: '',
  flex: 1,
  minWidth: 50,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const valueGetter = ({ value }: { value: any }) =>
  value && value === true ? 'YES' : 'NO';

export const feedTableColumns: GridColDef[] = [
  {
    ...columnDefaults,
    field: 'id',
    headerName: 'Neo Id',
  },
  {
    ...columnDefaults,
    field: 'name',
    headerName: 'Name',
  },
  {
    ...columnDefaults,
    field: 'absolute_magnitude_h',
    headerName: 'Absolute Magnitude',
  },
  {
    ...columnDefaults,
    field: 'is_potentially_hazardous_asteroid',
    headerName: 'Is Potentially Hazardous',
    valueGetter: valueGetter,
    align: 'center',
  },
  {
    ...columnDefaults,
    field: 'fav',
    headerName: 'Action',
    renderCell: (params: GridRenderCellParams<AsteroidData>) =>
      RenderCellComponent(params),
  },
];

export const favTableColumns: GridColDef[] = [
  {
    ...columnDefaults,
    field: 'asteroidNeoId',
    headerName: 'Neo Id',
  },
  {
    ...columnDefaults,
    field: 'asteroidName',
    headerName: 'Name',
  },
  {
    ...columnDefaults,
    field: 'absoluteMagnitudeH',
    headerName: 'Absolute Magnitude',
  },
  {
    ...columnDefaults,
    field: 'isPotentiallyHazardousAsteroid',
    headerName: 'Is Potentially Hazardous',
    valueGetter: valueGetter,
  },
];
