import { Grid, Paper } from '@mui/material';
import { AsteroidFavoritesTable } from './AsteroidFavoritesTable';

export function AsteroidFavoritesList() {
  return (
    <Grid item xs={12}>
      <Paper
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <h1>Favorites</h1>
        <br />
        <AsteroidFavoritesTable />
      </Paper>
    </Grid>
  );
}
