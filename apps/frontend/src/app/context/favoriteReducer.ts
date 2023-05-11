import { Reducer } from 'react';
import { InitialStateType } from './FavoriteContext';

export type ReducerActionType = {
  payload: Partial<InitialStateType>;
};
export const favoriteReducer: Reducer<InitialStateType, ReducerActionType> = (
  state,
  action
) => {
  return {
    ...state,
    ...action.payload,
  };
};
