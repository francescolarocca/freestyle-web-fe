import React, { useState } from "react";

const AddPresenzaRankingModal = ({ closeModal, onPresenzaAdded, rapper }) => {
  // Stato per il form
  const [formData, setFormData] = useState({
    rapper: "",
    evento: "presenza", // Valore predefinito
    data: new Date().toISOString().split("T")[0],
    moltiplicatore: "casa", // Valore predefinito
    posizionamento: "",
  });


  const addPresenza = async (e) => {
    e.preventDefault();
    const jsonData = {
      data: new Date(formData.data).toISOString(),
      evento: formData.evento,
      posizionamento: formData.posizionamento,
      moltiplicatore: formData.moltiplicatore,
    };
    const API_BASE_URL = 'http://localhost:8080/murettifreestyle';
    try {
      // Invia il JSON al server tramite POST
      const response = await fetch(`${API_BASE_URL}/addPresenza/Muretto/Messina/${formData.rapper}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Indica che inviamo JSON
        },
        body: JSON.stringify(jsonData), // Converte l'oggetto JavaScript in una stringa JSON
      });

      if (response.ok) {
        closeModal(); // Chiudi il modale
        onPresenzaAdded();
      } else {
        throw new Error("Errore nella creazione dell'appello");
      }
    } catch (error) {
      console.error('Errore:', error);
      alert('Si è verificato un errore.');
    }
  };

  return (
    <div className="modal-content">
      <div className="modal-form">
        <button className="close-modal" onClick={closeModal}>X</button>
        <h2>Aggiungi al Ranking</h2>
        <form onSubmit={(e) => addPresenza(e)}>
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

export default AddPresenzaRankingModal;