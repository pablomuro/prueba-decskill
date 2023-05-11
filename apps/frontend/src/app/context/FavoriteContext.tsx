import { createContext, Dispatch, useReducer, FC } from 'react';
import { ReducerActionType, favoriteReducer } from './favoriteReducer';

export type InitialStateType = {
  successfulAdded: boolean | null;
  isFetching: boolean;
  id?: string;
};

type FavoriteContext = {
  filterContext: InitialStateType;
  setFavoriteContext: Dispatch<InitialStateType>;
};

export const initialState: InitialStateType = {
  successfulAdded: null,
  isFetching: false,
  id: undefined,
};

export const FavoriteContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<ReducerActionType>;
}>({
  state: initialState,
  dispatch: () => null,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const FavoriteProvider: FC<any> = ({ children }) => {
  const [state, dispatch] = useReducer(favoriteReducer, initialState);

  return (
    <FavoriteContext.Provider value={{ state, dispatch }}>
      {children}
    </FavoriteContext.Provider>
  );
};
