import React, { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { findAllMuretti } from '../services/muretto';


function RankingCard() {
  const { id } = useParams();

  const [muretto, setMuretto] = useState([]);
  const [expandedRapper, setExpandedRapper] = useState(null);

  useEffect(() => {
      console.log('RankingCardNew mounted');
      
      async function findMurettoByAlias() {
        
        if(!ignore) {
          const result = await findAllMuretti();
          console.log(result.data);
          setMuretto(result.data.find(i => i.alias === id));
        }
      }
  
      let ignore = false;
      findMurettoByAlias();
      return () => {
        ignore = true;
        console.log('RankingCardNew unmounted');
      }
    }
    , []);  
  
  

  const toggleDetails = (nome) => {
    setExpandedRapper((prev) => (prev === nome ? null : nome));
  };

 
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-primary">
        {id} Ranking
      </h1>
    <div className="min-h-screen w-full  flex items-center justify-center p-4">
    <div className="w-full bg-white shadow-xl rounded-lg overflow-hidden">
      <table className="w-full text-sm text-left text-gray-700">
        <thead className="bg-gray-200 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-6 py-3">Nome</th>
              <th className="px-6 py-3">Rank</th>
              <th className="px-6 py-3">azioni</th>
            </tr>
          </thead>
          <tbody>
            {muretto.rapper?.map((row) => (
              <React.Fragment key={row.nome}>
                               <tr className="border-b hover:bg-gray-50 transition">

                  <td className="px-6 py-4 font-medium text-gray-900">{row.nome}</td>
                  <td className="px-6 py-4">{row.rank}</td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => toggleDetails(row.nome)}
                      className="text-blue-600 hover:text-blue-800 transition transform hover:scale-110"
                      aria-label={`Mostra dettagli per ${row.nome}`}
                    >
                      ℹ️
                    </button>
                  </td>
                </tr>
                {expandedRapper === row.nome && (
                  row.presenze.map((presenza) => (
                    <tr key={presenza.id} className="bg-gray-50">
                      <td colSpan="3" className="px-6 py-4 text-sm text-gray-700">
                        <p><strong>Data:</strong> {presenza.data} - Evento: {presenza.evento} - Punti: {presenza.punteggio}</p>
                      </td>
                    </tr>
                  ))
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
}

export default RankingCard;