import React from 'react';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import HomePage from './pages/HomePage';
import MurettoLayout from './pages/muretto/MurettoLayout';
import MurettoPage from './pages/muretto/MurettoPage';
import RankingPage from './pages/muretto/RankingPage';
const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/muretto/:id',
    element: <MurettoLayout />,
    children: [
      { index: true, element: <MurettoPage /> },
      { path: 'ranking', element: <RankingPage /> },
    ],
  },
]);


function App() {
  return <RouterProvider router={router} />;
}

export default App;