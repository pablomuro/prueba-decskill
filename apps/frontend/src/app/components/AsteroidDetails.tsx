import { AsteroidData } from '@monorepo/types';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { CircularProgress, IconButton, Paper } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Fragment, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { fetchParser } from '../../helpers/fetchMiddlaware';
import Title from './Title';

export function AsteroidDetails() {
  const location = useLocation();
  const { id } = useParams();

  const [asteroidData, setAsteroidData] = useState<AsteroidData | null>(
    location.state
  );
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const navigate = useNavigate();
  useEffect(() => {
    if (asteroidData == null && id && isFetching === false) {
      setIsFetching(true);
      fetch(`/api/favorite/${id}`)
        .then(fetchParser)
        .then((res: AsteroidData) => {
          console.log(res);
          setAsteroidData(() => res);
          setIsFetching(false);
        })
        .catch((err) => {
          setError(err);
          setIsFetching(false);
        });
    }
  }, [asteroidData, id, isFetching]);

  console.log(asteroidData?.is_potentially_hazardous_asteroid);

  const getCloseApproachDate = (asteroidData: AsteroidData) =>
    asteroidData.close_approach_data[
      asteroidData.close_approach_data.length - 1
    ].close_approach_date;

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

  if (asteroidData)
    return (
      <Fragment>
        <IconButton
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

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <></>;
}
