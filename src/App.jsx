import React from 'react';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import HomePage from './pages/HomePage';
import MurettoLayout from './pages/muretto/MurettoLayout';
import MurettoDashboardPage from './pages/muretto/MurettoDashboardPage';
import RankingPage from './pages/muretto/RankingPage';
import ModalitaPage from './pages/muretto/ModalitaPage';
import ModalitaLayout from './pages/muretto/modalita/ModalitaLayout';
import OneVsOne from './pages/muretto/modalita/OneVsOne';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/muretto/:id',
    element: <MurettoLayout />,
    children: [
      { index: true, element: <MurettoDashboardPage /> },
      { path: 'ranking', element: <RankingPage /> },
      {
        path: 'modalita',
        element: <ModalitaLayout />, // diventa un layout con <Outlet />
        children: [
          { index: true, element: <ModalitaPage /> }, // schermata con i tab
          { path: 'OneVsOne', element: <OneVsOne /> },
        ],
      },

    ],
  },
]);


function App() {
  return <RouterProvider router={router} />;
}

export default App;