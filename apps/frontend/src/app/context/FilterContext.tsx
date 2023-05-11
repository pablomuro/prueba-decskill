import { createContext, Dispatch, useReducer, FC } from 'react';
import { ApiFilter } from '@monorepo/types';
import { ReducerActionType, filterReducer } from './filterReducer';

export type InitialStateType = ApiFilter & { isToFilter: boolean };

type FilterContext = {
  filterContext: InitialStateType;
  setFilterContext: Dispatch<InitialStateType>;
};

export const initialState: InitialStateType = {
  startDate: null,
  endDate: null,
  isToFilter: false,
};

export const FilterContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<ReducerActionType>;
}>({
  state: initialState,
  dispatch: () => null,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const FilterProvider: FC<any> = ({ children }) => {
  const [state, dispatch] = useReducer(filterReducer, initialState);

  return (
    <FilterContext.Provider value={{ state, dispatch }}>
      {children}
    </FilterContext.Provider>
  );
};
