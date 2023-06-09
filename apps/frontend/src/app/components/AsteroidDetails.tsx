import { AsteroidData } from '@monorepo/types';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { CircularProgress, IconButton, Paper } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Fragment, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useFetchData } from '../hooks/useFetchData';
import Title from './Title';

function Loading() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <CircularProgress color="inherit" />
    </div>
  );
}

export function AsteroidDetails() {
  const location = useLocation();
  const { id } = useParams();

  const apiUrl = `/api/favorite/${id}`;

  const {
    data: asteroidData,
    error,
    isFetching,
    isDone,
    fetchData,
  } = useFetchData<AsteroidData>({
    url: apiUrl,
    initialData: location.state,
    stopFirstFetch: true,
  });

  useEffect(() => {
    if (id && isDone === false) {
      fetchData();
    }
  }, [id, fetchData, isDone]);

  const navigate = useNavigate();

  const getCloseApproachDate = (asteroidData: AsteroidData) =>
    asteroidData.close_approach_data[
      asteroidData.close_approach_data.length - 1
    ].close_approach_date;

  if (error) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <h1>{error.message}</h1>
      </div>
    );
  }

  if (asteroidData)
    return (
      <Fragment>
        <IconButton
          disableFocusRipple
          disableRipple
          onClick={() => {
            navigate(-1);
          }}
        >
          <ChevronLeftIcon />
          back
        </IconButton>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '100%',
          }}
        >
          <Title>{`Asteroid ${asteroidData.name}`}</Title>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Estimated Diameter (M)</TableCell>
                <TableCell>Absolute Magnitude</TableCell>
                <TableCell>Is Potentially Hazardous</TableCell>
                <TableCell>Close Approach Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  {
                    asteroidData.estimated_diameter.meters
                      .estimated_diameter_max
                  }
                </TableCell>
                <TableCell>{asteroidData.absolute_magnitude_h}</TableCell>
                <TableCell>
                  {asteroidData.is_potentially_hazardous_asteroid === true
                    ? 'YES'
                    : 'NO'}
                </TableCell>
                <TableCell>{getCloseApproachDate(asteroidData)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
      </Fragment>
    );

  if (isFetching) return <Loading />;

  return <Loading />;
}
