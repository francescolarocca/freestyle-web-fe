import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Components/Home';
import MurettoOptions from './Components/MurettoOptions';
import RapperList from "./Components/ListaRapper/RapperList";
import Ranking from './Components/Rank/Ranking';  // La pagina per il ranking
import Modalita from './Components/Modalita/Modalita';
import RapperProfile from './Components/Profile/RapperProfile';


const App = () => {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/muretto/:murettoId" element={<MurettoOptions  />} />
      <Route path="/muretto/:murettoName/ranking" element={<Ranking />} />
      <Route path="/muretto/:murettoId/rapper" element={<RapperList />} />
      <Route path="/muretto/:murettoName/Modalita" element={<Modalita />} />
      <Route path="/muretto/:murettoId/rapper/:nomeRapper" element={<RapperProfile />} />  
    </Routes>
  </Router>
  );
}

export default App;
