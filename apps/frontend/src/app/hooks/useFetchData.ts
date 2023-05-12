import { useCallback, useEffect, useState } from 'react';

type UseFetchDataProps<T> = {
  url: string;
  config?: RequestInit;
  initialData?: T | undefined;
  stopFirstFetch?: boolean;
};

export function useFetchData<T>({
  url,
  config = undefined,
  initialData = null as T,
  stopFirstFetch = false,
}: UseFetchDataProps<T>) {
  const [data, setData] = useState<T>(initialData);

  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [isDone, setIsDone] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(
    async (newConfig?: RequestInit) => {
      try {
        setIsFetching(true);
        setError(null);
        const response = await fetch(url, newConfig ? newConfig : config ?? {});
        if (!response.ok) throw Error('Error on fetching data');

        const apiData: T = await response.json();

        setData(() => apiData);
      } catch (error) {
        setError(error as Error);
      } finally {
        setIsDone(true);
        setIsFetching(false);
      }
    },
    [config, url]
  );

  useEffect(() => {
    if (!stopFirstFetch) fetchData();
  }, [stopFirstFetch, fetchData]);

  return { data, error, isFetching, isDone, fetchData };
}
