import React from "react";

const RankingTable = ({ rapper, openInfoModal }) => {
  return (
    <table className="rapper-table">
      <thead>
        <tr>
          <th>Posizione</th>
          <th>Nome</th>
          <th>Rank</th>
          <th>Info</th>
        </tr>
      </thead>
      <tbody>
        {rapper.length > 0 ? (
          rapper.map((rapperItem, index) => (
            <tr key={rapperItem.nome}>
              <td>{index + 1}</td> 
              <td>{rapperItem.nome}</td>
              <td>{rapperItem.rank}</td>
              <td>
                <button className="btn-info" onClick={() => openInfoModal(rapperItem)}>Info</button> 
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4">Nessun rapper trovato per questo muretto.</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default RankingTable;
