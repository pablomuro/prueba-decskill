import { Fragment, StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';

import App from './app/app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <Fragment>
      <CssBaseline />
      <App />
    </Fragment>
  </StrictMode>
);
