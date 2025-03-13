import React from "react";

const RapperInfoModal = ({ showInfoModal, closeInfoModal, selectedRapper }) => {
  if (!showInfoModal || !selectedRapper) return null;

  return (
    <div className="modal-content">
      <div className="modal-form">
        <button className="close-modal" onClick={closeInfoModal}>X</button>
        <h2>{selectedRapper.nome}</h2>
        <ul className="rapper-list">
          {selectedRapper.presenze && selectedRapper.presenze.length > 0 ? (
            selectedRapper.presenze.map((presenza, index) => (
              <li key={index}>
                <span>{new Date(presenza.data).toISOString().split('T')[0]} - {presenza.evento} - {presenza.punteggio}</span>
              </li>
            ))
          ) : (
            <li>Nessuna presenza registrata.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default RapperInfoModal;
