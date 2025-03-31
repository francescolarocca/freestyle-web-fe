import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MurettoPage from './pages/MurettoPage';
import RankingCard from './components/RankingCard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/muretto/:id" element={<MurettoPage/>} />
          <Route path="/muretto/:id/ranking" element={<RankingCard/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;