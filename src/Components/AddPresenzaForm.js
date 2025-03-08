import React, { useState } from "react";
import { addPresenzaToRapper } from "../api";
import { getAllItems } from "../api"

const AddPresenzaForm = ({ rapper, onPresenzaAdded }) => {
  const [data, setData] = useState("");
  const [evento, setEvento] = useState("");
  const [punteggio, setPunteggio] = useState("");

  // Funzione handleSubmit definita prima del JSX
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data || !evento || !punteggio) {
      alert("Compila tutti i campi!");
      return;
    }

    const nuovaPresenza = {
      data,
      evento,
      punteggio: parseInt(punteggio, 10),
    };

    try {
      await addPresenzaToRapper(rapper.muretto, rapper.nome, nuovaPresenza);
      alert("Presenza aggiunta con successo!");
      //onPresenzaAdded(); // Ricarica i dati
      setData("");
      setEvento("");
      setPunteggio("");
    } catch (error) {
      alert("Errore nell'aggiunta della presenza. handle");
    }
  };

  return (
    <div>
      <h3>Aggiungi Presenza per {rapper.nome} nel muretto {rapper.muretto}</h3>
      <form onSubmit={handleSubmit}>
        <label>Data:</label>
        <input
          type="date"
          value={data}
          onChange={(e) => setData(e.target.value)}
          required
        />

        <label>Evento:</label>
        <input
          type="text"
          value={evento}
          onChange={(e) => setEvento(e.target.value)}
          required
        />

        <label>Punteggio:</label>
        <input
          type="number"
          value={punteggio}
          onChange={(e) => setPunteggio(e.target.value)}
          required
        />

        <button type="submit">Aggiungi Presenza</button>
      </form>
    </div>
  );
};

export default AddPresenzaForm;
