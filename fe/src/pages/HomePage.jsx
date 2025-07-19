import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { findAllMuretti } from '../services/muretto';


function HomePage() {
  const navigate = useNavigate();

  // EFFECT
   useEffect(() => {
      async function findAll() {
        const result = await findAllMuretti();
          console.log(result.data);
          setMuretti(result.data);
      }
      findAll();
    }
    , []);  
  
  // STATE
  const [muretti, setMuretti] = useState([]);


  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-primary">
        Freestyle Battle Italia
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {muretti.map((muretto) => (
          <div 
            key={muretto.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
            onClick={() => navigate(`/muretto/${muretto.alias}`)}
          >
            <img 
              src={muretto.image} 
              alt={muretto.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{muretto.alias}</h2>
              <p className="text-gray-600">
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;