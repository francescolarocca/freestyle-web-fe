import React, { useEffect, useState } from 'react';
import { getAllItems } from './api';
import RapperTable from './Components/RapperTable';
import MurettoTable from './Components/MurettoTable';
import CreateItemForm from './Components/CreateItemForm';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Components/Home';
import MurettoOptions from './Components/MurettoOptions';
import RapperList from "./Components/RapperList";
import Ranking from './Components/Ranking';  // La pagina per il ranking
import Modalita from './Components/Modalita';



const App = () => {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/muretto/:murettoId" element={<MurettoOptions  />} />
      <Route path="/muretto/:murettoName/ranking" element={<Ranking />} />
      <Route path="/muretto/:murettoId/rapper" element={<RapperList />} />
      <Route path="/muretto/:murettoName/Modalita" element={<Modalita />} />  
    </Routes>
  </Router>
  );
}

export default App;
