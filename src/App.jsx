import React from 'react';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import HomePage from './pages/HomePage';
import MurettoLayout from './pages/muretto/MurettoLayout';
import MurettoDashboardPage from './pages/muretto/MurettoDashboardPage';
import RankingPage from './pages/muretto/ranking/RankingPage';
import ModalitaPage from './pages/muretto/modalita/ModalitaPage';
import ModalitaLayout from './pages/muretto/modalita/ModalitaLayout';
import OneVsOne from './pages/muretto/modalita/OneVsOne';
import TwoVsTwo from './pages/muretto/modalita/TwoVsTwo';
import RapperPage from './pages/muretto/rapper/RapperPage';
import RapperLayout from './pages/muretto/rapper/RapperLayout';
import NewRapper from './pages/muretto/rapper/NewRapper';
import RappperDetail from './pages/muretto/rapper/RapperDetail';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/muretto/:aliasMuretto',
    element: <MurettoLayout />,
    children: [
      { index: true, element: <MurettoDashboardPage /> },
      { path: 'ranking', element: <RankingPage/> },
      { path: 'rapper', 
        element: <RapperLayout /> ,
        children : [
          {index: true, element: <RapperPage />},
          {path:'new',element: <NewRapper/>},
          {path:'detail/:nome',element: <RappperDetail/>} // schermata con i tab
        ]
      },
      {
        path: 'modalita',
        element: <ModalitaLayout />, // diventa un layout con <Outlet />
        children: [
          { index: true, element: <ModalitaPage /> }, // schermata con i tab
          { path: 'OneVsOne', element: <OneVsOne /> },
          { path: 'TwoVsTwo', element: <TwoVsTwo /> },
        ],
      },

    ],
  },
]);


function App() {
  return <RouterProvider router={router} />;
}

export default App;