import React from "react";

const AddRapperForm = ({ newRapper, setNewRapper, newRank, setNewRank, handleAddRapper, errorMessage }) => {
  return (
    <div>
      <h3 className="subtitle">Aggiungi un nuovo rapper</h3>
      <input 
        type="text" 
        className="input-field"
        value={newRapper} 
        onChange={(e) => setNewRapper(e.target.value)} 
        placeholder="Nome del rapper" 
      />
      <input
        type="number"
        className="input-field"
        value={newRank}
        onChange={(e) => setNewRank(e.target.value)}
        placeholder="Rank"
      />
      <button className="btn btn-add" onClick={handleAddRapper}>Aggiungi</button>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default AddRapperForm;
