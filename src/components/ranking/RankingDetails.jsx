
import React from 'react';
function RankingDetails({ presenze,onDelete }) {

  return (
    <>
      {presenze.map((presenza) => (
        <tr key={presenza.id} className="bg-gray-50 relative">
          <td colSpan="4" className="px-6 py-4 text-sm text-gray-700">
          <button
              onClick={() => onDelete(presenza.data)}
              className="absolute top-0 right-0 mt-2 mr-2 text-red-500 hover:text-red-700"
              aria-label="Delete"
            >
              ❌
            </button>
            <p><strong>Data:</strong> {new Intl.DateTimeFormat('it-IT').format(new Date(presenza.data))}</p>
            <p> <strong> Evento:</strong> {presenza.evento} </p>
            <p> <strong> Punti:</strong> {presenza.punteggio} </p>
            <hr></hr>
          </td>
        </tr>
      ))}

    </>
  );
}


export default RankingDetails;