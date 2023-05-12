import { AsteroidData } from '@monorepo/types';
import { useCallback, useContext, useEffect } from 'react';
import { FavoriteContext } from '../context/FavoriteContext';
import { useFetchData } from './useFetchData';

const FAV_API_URL = '/api/addAsteroidToFavorite';
export function useAddFavorites() {
  const { state, dispatch } = useContext(FavoriteContext);

  const { data, error, isDone, fetchData } = useFetchData<boolean>({
    url: FAV_API_URL,
    stopFirstFetch: true,
    initialData: false,
  });

  const addAsteroidToFavorites = useCallback(
    async ({
      id,
      name,
      absolute_magnitude_h,
      is_potentially_hazardous_asteroid,
    }: Partial<AsteroidData>) => {
      const body = JSON.stringify({
        id,
        name,
        absolute_magnitude_h,
        is_potentially_hazardous_asteroid,
      });

      dispatch({
        payload: { isFetching: true, id },
      });

      await fetchData({
        method: 'POST',
        body,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      dispatch({
        payload: { isFetching: false, id: undefined },
      });
    },
    [dispatch, fetchData]
  );

  useEffect(() => {
    if (isDone) {
      if (data === true) {
        dispatch({
          payload: { successfulAdded: true },
        });
      } else if (error || data === false) {
        dispatch({
          payload: { successfulAdded: false },
        });
      }
    }
  }, [isDone, data, error, dispatch]);

  const resetSuccessfulAdded = useCallback(() => {
    dispatch({
      payload: { successfulAdded: null },
    });
  }, [dispatch]);

  return {
    successfulAdded: state.successfulAdded,
    isFetchingFav: state.isFetching,
    id: state.id,
    addAsteroidToFavorites,
    resetSuccessfulAdded,
  };
}
