import Dashboard from './components/Dashboard';
import { AsteroidDetails } from './components/AsteroidDetails';
import { FilterProvider } from './context/FilterContext';
import { FavoriteProvider } from './context/FavoriteContext';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AsteroidFeedList } from './components/AsteroidFeedList';
import { AsteroidFavoritesList } from './components/AsteroidFavoritesList';
import { ErrorPage } from './components/ErrorPage';

import './app.module.scss';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Dashboard />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <AsteroidFeedList />,
      },
      {
        path: '/favorites',
        element: <AsteroidFavoritesList />,
      },
      {
        path: '/detail/:id?',
        element: <AsteroidDetails />,
      },
    ],
  },
]);

export function App() {
  return (
    <FilterProvider>
      <FavoriteProvider>
        <RouterProvider router={router} />
      </FavoriteProvider>
    </FilterProvider>
  );
}

export default App;
