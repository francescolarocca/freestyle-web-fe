import React, { useState,useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';

function MurettoPage() {
  const { id } = useParams();
  
   const navigate = useNavigate();
  return (    
      <div className="flex items-start justify-center px-4 py-4"> {/* ridotto padding */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
        <div
          key="ranking"
          onClick={() => navigate(`/muretto/${id}/ranking`)}
          className="cursor-pointer bg-white rounded-2xl h-64 flex items-center justify-center text-4xl font-bold shadow-md hover:shadow-2xl hover:shadow-blue-200 transition duration-300 border border-gray-200 hover:border-blue-400"
        >
          Ranking
        </div>
        <div
          key="modalita"
          onClick={() => navigate(`/muretto/${muretto.alias}`)}
          className="cursor-pointer bg-white rounded-2xl h-64 flex items-center justify-center text-4xl font-bold shadow-md hover:shadow-2xl hover:shadow-blue-200 transition duration-300 border border-gray-200 hover:border-blue-400"
        >
          Modalita
        </div>
        <div
          key="rapper"
          onClick={() => navigate(`/muretto/${muretto.alias}`)}
          className="cursor-pointer bg-white rounded-2xl h-64 flex items-center justify-center text-4xl font-bold shadow-md hover:shadow-2xl hover:shadow-blue-200 transition duration-300 border border-gray-200 hover:border-blue-400"
        >
          Rapper
        </div>
        <div
          key="Appello"
          onClick={() => navigate(`/muretto/${muretto.alias}`)}
          className="cursor-pointer bg-white rounded-2xl h-64 flex items-center justify-center text-4xl font-bold shadow-md hover:shadow-2xl hover:shadow-blue-200 transition duration-300 border border-gray-200 hover:border-blue-400"
        >
          Appello
        </div>
      </div>
    </div>
  );
}

export default MurettoPage;