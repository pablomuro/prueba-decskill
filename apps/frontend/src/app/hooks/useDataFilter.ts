import { ApiFilter } from '@monorepo/types';
import { useCallback, useContext } from 'react';
import { FilterContext } from '../context/FilterContext';
import { FilterAction } from '../context/filterReducer';
import type { Dayjs } from 'dayjs';

export function useDateFilter() {
  const { state, dispatch } = useContext(FilterContext);

  const setDateFilter = useCallback(
    (value: ApiFilter) => {
      dispatch({
        type: FilterAction.CHANGE_FILTER_DATA,
        payload: { ...value },
      });
    },
    [dispatch]
  );

  const getParsedDateFilter = useCallback(() => {
    const startDate = (state.startDate as Dayjs)?.format('YYYY-MM-DD') || '';
    const endDate = (state.endDate as Dayjs)?.format('YYYY-MM-DD') || '';

    return { startDate, endDate };
  }, [state]);

  return {
    dateFilter: { startDate: state.startDate, endDate: state.endDate },
    setDateFilter,
    getParsedDateFilter,
  };
}

export function useFilter() {
  const { state, dispatch } = useContext(FilterContext);

  const setIsToFilter = (value: boolean) => {
    dispatch({
      type: FilterAction.SET_IS_TO_FILTER,
      payload: { isToFilter: value },
    });
  };

  return {
    isToFilter: state.isToFilter,
    setIsToFilter,
  };
}
