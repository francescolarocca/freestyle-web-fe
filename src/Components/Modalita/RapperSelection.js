const RapperSelection = ({ rapper, selectedRappers, toggleRapperSelection }) => {
    return (
      <>
        <h2>Seleziona i rapper presenti</h2>
        <table>
          <thead>
            <tr>
              <th>Seleziona</th>
              <th>Nome</th>
            </tr>
          </thead>
          <tbody>
            {rapper.map((rapperItem) => (
              <tr key={rapperItem.nome}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedRappers.includes(rapperItem.nome)}
                    onChange={() => toggleRapperSelection(rapperItem.nome)}
                  />
                </td>
                <td>{rapperItem.nome}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  };

  export default RapperSelection;

  