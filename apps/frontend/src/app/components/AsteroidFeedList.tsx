import { Grid, Paper } from '@mui/material';
import { DataFilter } from './DataFilter';
import { AsteroidsFeedTable } from './AsteroidsFeedTable';

export function AsteroidFeedList() {
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
        <h1>Feed List</h1>
        <div style={{ padding: '30px 0', paddingBottom: '50px' }}>
          <DataFilter />
        </div>
        <AsteroidsFeedTable />
      </Paper>
    </Grid>
  );
}
