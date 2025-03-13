import React from "react";

const UpdateRapperModal = ({ isModalOpen, closeModal, updatedName, setUpdatedName, updatedRank, setUpdatedRank, handleUpdateRank }) => {
  if (!isModalOpen) return null;

  return (
    <div className="modal-rap">
      <h3>Modifica Rank e Nome del Rapper</h3>
      <label>
        Nome:
        <input 
          type="text" 
          className="input-field"
          value={updatedName} 
          onChange={(e) => setUpdatedName(e.target.value)} 
          placeholder="Nuovo nome" 
        />
      </label>
      <br />
      <label>
        Rank:
        <input
          type="number"
          className="input-field"
          value={updatedRank}
          onChange={(e) => setUpdatedRank(e.target.value)}
          placeholder="Nuovo rank"
        />
      </label>
      <br />
      <button className="btn btn-save" onClick={handleUpdateRank}>Salva</button>
      <button className="btn btn-close" onClick={closeModal}>Chiudi</button>
    </div>
  );
};

export default UpdateRapperModal;
