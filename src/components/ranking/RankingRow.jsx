import React from 'react';
function RankingRow ({row,toggleDetails, toggleAddNew,posizione}) {
  
  return (
    <tr className="border-b hover:bg-gray-50 transition">
      <td className="px-3 py-2 font-small text-gray-900 w-4">{posizione}</td>
      <td className="px-6 py-4 font-medium text-gray-900">{row.nome}</td>
      <td className="px-6 py-4">{row.rank}</td>
      <td className="px-6 py-4 ">
        <button
          onClick={() => toggleDetails(row.nome)}
          className="text-blue-600 hover:text-blue-800 transition transform hover:scale-110 "
          aria-label={`Mostra dettagli per ${row.nome}`}
        >
          ℹ️
        </button>
        <button
          onClick={() => toggleAddNew(row.nome)}
          className="text-blue-600 hover:text-blue-800 transition transform hover:scale-110 "
          aria-label={`Mostra dettagli per ${row.nome}`}
        >
          ➕
        </button>
      </td>
    </tr>
  );
}
  export default RankingRow;