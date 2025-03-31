
import React from 'react';

function RankingDetails({presenze}) {
    return (
    <>
      {presenze.map((presenza) => (
        <tr key={presenza.id} className="bg-gray-50">
          <td colSpan="3" className="px-6 py-4 text-sm text-gray-700">
            <p>
              <strong>Data:</strong> {presenza.data} - 
              <strong> Evento:</strong> {presenza.evento} - 
              <strong> Punti:</strong> {presenza.punteggio}
            </p>
          </td>
        </tr>
      ))}
    </>
  );
}
  

  export default RankingDetails;