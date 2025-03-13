import React from "react";

const RapperTable = ({ rapper, openModal, handleDeleteRapper }) => {
  return (
    <table className="rapper-table">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Rank</th>
          <th>Azione</th>
        </tr>
      </thead>
      <tbody>
        {rapper.length > 0 ? (
          rapper.map((rapperItem) => (
            <tr key={rapperItem.nome}>
              <td>{rapperItem.nome}</td>
              <td>{rapperItem.rank}</td>
              <td>
                <button className="btn btn-update" onClick={() => openModal(rapperItem)}>
                  Aggiorna Rank e Nome
                </button>
                <button className="btn btn-delete" onClick={() => handleDeleteRapper(rapperItem.nome)}>
                  Elimina
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="3" className="no-rapper">Nessun rapper trovato per questo muretto.</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default RapperTable;
