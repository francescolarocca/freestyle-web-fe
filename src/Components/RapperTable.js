import React from 'react';

const RapperTable = ({ rappers }) => {
  return (
    <div>
      <h2>Lista Rapper</h2>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tipo</th>
            <th>Nome</th>
            <th>Muretto</th>
          </tr>
        </thead>
        <tbody>
          {rappers.length > 0 ? (
            rappers.map((rapper) => (
              <tr key={rapper.id}>
                
                <td>{rapper.tipo}</td>
                <td>{rapper.valore}</td>
                <td>{rapper.muretto}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">Caricamento...</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RapperTable;
