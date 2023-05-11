import { AsteroidData } from '@monorepo/types';
import { fetchParser } from '../../helpers/fetchMiddlaware';
import { useContext } from 'react';
import { FavoriteContext } from '../context/FavoriteContext';

const FAV_API_URL = '/api/addAsteroidToFavorite';
export function useAddFavorites() {
  const { state, dispatch } = useContext(FavoriteContext);

  const resetSuccessfulAdded = () => {
    dispatch({
      payload: { successfulAdded: null },
    });
  };
  const addAsteroidToFavorites = async ({
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

    try {
      const res = await fetch(FAV_API_URL, {
        method: 'POST',
        body,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result: boolean = await fetchParser(res);

      if (result === true) {
        dispatch({
          payload: { successfulAdded: true },
        });
      }
    } catch (error) {
      dispatch({
        payload: { successfulAdded: false },
      });
    }

    dispatch({
      payload: { isFetching: false, id: undefined },
    });
  };

  return {
    successfulAdded: state.successfulAdded,
    isFetchingFav: state.isFetching,
    id: state.id,
    addAsteroidToFavorites,
    resetSuccessfulAdded,
  };
}
