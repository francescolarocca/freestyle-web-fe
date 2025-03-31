import React, { useState } from 'react';
import RankingRow from './RankingRow';
import RankingDetails from './RankingDetails';
function RankingTable({ rapper }) {

  const [expandedRapper, setExpandedRapper] = useState(null);
  const toggleDetails = (nome) => {
    setExpandedRapper((prev) => (prev === nome ? null : nome));
  };
  return (
    <table className="w-full text-sm text-left text-gray-700">
      <thead className="bg-gray-200 text-gray-600 uppercase text-xs">
        <tr>
          <th className="px-6 py-3">Nome</th>
          <th className="px-6 py-3">Rank</th>
          <th className="px-6 py-3">azioni</th>
        </tr>
      </thead>
      <tbody>
        {rapper.map((row) => (
          <>
            <RankingRow key={`${row.nome}-row`} row={row} toggleDetails={toggleDetails} />
            {expandedRapper === row.nome &&
              <RankingDetails
                key={`${row.nome}-details`}
                presenze={row.presenze}
              />}
          </>
        ))}
      </tbody>
    </table>
  );
}


export default RankingTable;
