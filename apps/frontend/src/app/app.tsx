import Dashboard from './components/Dashboard';
import { AsteroidDetails } from './components/AsteroidDetails';
import { FilterProvider } from './context/FilterContext';
import { FavoriteProvider } from './context/FavoriteContext';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import styles from './app.module.scss';
import { AsteroidFeedList } from './components/AsteroidFeedList';
import { AsteroidFavoritesList } from './components/AsteroidFavoritesList';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Dashboard />,
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
