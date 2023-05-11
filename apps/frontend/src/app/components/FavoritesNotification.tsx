import { useEffect, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

type NotificationSnackbarProps = {
  showNotification: boolean | null;
};

export function FavoritesNotification({
  showNotification = false,
}: NotificationSnackbarProps) {
  const [open, setOpen] = useState(showNotification !== null);
  const success = showNotification !== null && showNotification === true;

  useEffect(() => {
    setOpen(showNotification !== null);
  }, [showNotification]);

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    setOpen(false);
  };

  const action = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleClose}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  const message = success
    ? 'Asteroid added to favorites'
    : 'Asteroid already on favorites';

  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message={message}
        action={action}
      />
    </div>
  );
}
