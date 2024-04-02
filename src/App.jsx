// Librairies
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import { toast } from 'react-toastify';
import { lazy, Suspense } from 'react';

// components
import Main from './components/layouts/Main';
import Error from './pages/Error';

// HOME (lazy loading)
const Home = lazy(() => import('./pages/Home'));
// ABOUT (lazy loading)
const About = lazy(() => import('./pages/About'));
// CREATEPOKEMON (lazy loading)
const CreatePokemon = lazy(() => import('./pages/CreatePokemon'));
// POKEMON DETAILS (lazy loading)
const PokemonDetails = lazy(() => import('./pages/PokemonDetails'));

// router
const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: (
          <Suspense>
            <Home />
          </Suspense>
        ),
        loader: () =>
          import('./pages/Home').then((module) => module.loader()),
      },
      {
        path: '/about',
        element: (
          <Suspense>
            <About />
          </Suspense>
        ),
      },
      {
        path: '/create-pokemon',
        element: (
          <Suspense>
            <CreatePokemon />
          </Suspense>
        ),
      },
      {
        path: '/pokemon/:id',
        element: (
          <Suspense>
            <PokemonDetails />
          </Suspense>
        ),
      },
    ],
  },
]);

// MAIN FUNCTION
export default function App() {
  return <RouterProvider router={router} />;
}
