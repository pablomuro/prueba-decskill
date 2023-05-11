export const fetchParser = (res: Response) => {
  if (res.ok) return res.json();

  throw Error('Error on fetching data');
};
