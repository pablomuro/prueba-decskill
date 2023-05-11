import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import type { Dayjs } from 'dayjs';
import { PickerChangeHandlerContext } from '@mui/x-date-pickers/internals/hooks/usePicker/usePickerValue.types';
import { DateValidationError } from '@mui/x-date-pickers';
import { Button } from '@mui/material';
import { useDateFilter, useFilter } from '../hooks/useDataFilter';
import Grid from '@mui/material/Unstable_Grid2';

type OnChangeDatePicker = (
  field: string,
  value: Dayjs | null | string,
  context: PickerChangeHandlerContext<DateValidationError>
) => void;

export function DataFilter() {
  const { dateFilter, setDateFilter } = useDateFilter();

  const { setIsToFilter } = useFilter();

  const onChange: OnChangeDatePicker = (field, newValue, context) => {
    if (context.validationError) return;
    setDateFilter({
      ...dateFilter,
      [field]: newValue,
    });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid container spacing={3}>
        <Grid>
          <DatePicker
            value={dateFilter.startDate}
            label="Start Date"
            onChange={(value, context) => onChange('startDate', value, context)}
          />
        </Grid>

        <Grid>
          <DatePicker
            value={dateFilter.endDate}
            label="End Date"
            onChange={(value, context) => onChange('endDate', value, context)}
          />
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid>
          <Button variant="contained" onClick={() => setIsToFilter(true)}>
            Filter
          </Button>
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
}
