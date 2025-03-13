import React, { useState, useEffect } from "react";

const AddRankingModal = ({ showModal, closeModal, handleFormSubmit, rapper }) => {
  // Stato per il form
  const [formData, setFormData] = useState({
    rapper: "",
    evento: "presenza", // Valore predefinito
    data: "",
    moltiplicatore: "casa", // Valore predefinito
    posizionamento: "",
  });

  // Funzione per ottenere la data di oggi in formato YYYY-MM-DD
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // Prende solo la parte della data
  };

  // Imposta la data predefinita quando il modal viene aperto
  useEffect(() => {
    if (showModal) {
      setFormData((prevData) => ({
        ...prevData,
        data: getTodayDate(), // Imposta la data attuale
      }));
    }
  }, [showModal]);

  if (!showModal) return null;

  return (
    <div className="modal-content">
      <div className="modal-form">
        <button className="close-modal" onClick={closeModal}>X</button>
        <h2>Aggiungi al Ranking</h2>
        <form onSubmit={(e) => handleFormSubmit(e, formData)}> {/* Passiamo formData alla funzione */}
          
          {/* Selezione Rapper */}
          <select
            value={formData.rapper}
            onChange={(e) => setFormData({ ...formData, rapper: e.target.value })}
            required
          >
            <option value="">Seleziona un rapper</option>
            {rapper.map((rapperItem) => (
              <option key={rapperItem.nome} value={rapperItem.nome}>{rapperItem.nome}</option>
            ))}
          </select>

          {/* Selezione Tipo di Evento */}
          <select
            value={formData.evento}
            onChange={(e) => setFormData({ ...formData, evento: e.target.value })}
            required
          >
            <option value="presenza">Presenza</option>
            <option value="battle">Battle</option>
          </select>

          {/* Selezione Data */}
          <input
            type="date"
            value={formData.data}
            onChange={(e) => setFormData({ ...formData, data: e.target.value })}
            required
          />

          {/* Selezione Casa o Regionale */}
          <select
            value={formData.moltiplicatore}
            onChange={(e) => setFormData({ ...formData, moltiplicatore: e.target.value })}
          >
            <option value="casa">Casa</option>
            <option value="regionale">Regionale</option>
          </select>

          {/* Selezione Posizionamento (visibile solo se evento = "battle") */}
          {formData.evento === "battle" && (
            <select
              value={formData.posizionamento}
              onChange={(e) => setFormData({ ...formData, posizionamento: e.target.value })}
              required
            >
              <option value="">Seleziona posizionamento</option>
              <option value="ottavi">Ottavi</option>
              <option value="quarti">Quarti</option>
              <option value="semifinale">Semifinale</option>
              <option value="finale">Finale</option>
            </select>
          )}

          {/* Tasto Aggiungi (ora è sotto tutto) */}
          <button className="btn-save">Aggiungi</button>
        </form>
      </div>
    </div>
  );
};

export default AddRankingModal;
