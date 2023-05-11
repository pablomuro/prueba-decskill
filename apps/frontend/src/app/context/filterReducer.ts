import { Reducer } from 'react';
import { InitialStateType } from './FilterContext';

export const FilterAction = {
  CHANGE_FILTER_DATA: 'CHANGE_FILTER_DATA',
  SET_IS_TO_FILTER: 'SET_IS_TO_FILTER',
};

export type ReducerActionType = {
  type: string;
  payload: Partial<InitialStateType>;
};
export const filterReducer: Reducer<InitialStateType, ReducerActionType> = (
  state,
  action
) => {
  switch (action.type) {
    case FilterAction.CHANGE_FILTER_DATA:
      return {
        ...state,
        ...action.payload,
      };
    case FilterAction.SET_IS_TO_FILTER:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};
