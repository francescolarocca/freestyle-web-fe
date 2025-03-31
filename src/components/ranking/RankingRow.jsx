import React, { useState,useEffect, } from 'react';
import {useOutletContext} from 'react-router-dom';
import { findAllMuretti } from '../../services/muretto';
function RankingRow ({row,toggleDetails }) {
  return (
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
  );
}
  export default RankingRow;