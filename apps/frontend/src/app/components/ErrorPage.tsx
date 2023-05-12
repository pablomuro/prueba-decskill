import { Container, Grid } from '@mui/material';
import { useRouteError } from 'react-router-dom';

export function ErrorPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const error: any = useRouteError() as any;

  return (
    <Container maxWidth="lg" sx={{ mt: 2, mb: 2 }}>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
      </Grid>
    </Container>
  );
}
