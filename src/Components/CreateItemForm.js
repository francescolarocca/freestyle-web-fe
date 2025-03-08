import React, { useState } from 'react';
import { createItem } from '../api';

const CreateItemForm = ({ onItemCreated }) => {
  const [tipo, setTipo] = useState("rapper");
  const [valore, setValore] = useState("");
  const [muretto, setMuretto] = useState("");
  const [alias, setAlias] = useState("");
  const [rapperList, setRapperList] = useState([]);

  // Stato per un singolo rapper da aggiungere alla lista
  const [rapperNome, setRapperNome] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newItem = tipo === "rapper"
      ? { tipo, valore, muretto } // Se è un rapper, ha solo questi campi
      : { tipo, valore, alias, rapper: rapperList }; // Se è un muretto, ha una lista di rapper

    try {
      await createItem(newItem);
      alert("Elemento creato con successo!");
      onItemCreated(); // Ricarica la lista dopo la creazione
      setValore("");
      setMuretto("");
      setAlias("");
      setRapperList([]); // Resetta la lista rapper
      setRapperNome("");
    } catch (error) {
      alert("Errore nella creazione dell'elemento.");
    }
  };

  // Aggiungere un rapper alla lista
  const addRapperToList = () => {
    if (rapperNome.trim() !== "") {
      setRapperList([...rapperList, { nome: rapperNome, rank: 0, presenze: [] }]);
      setRapperNome("");
    }
  };

  return (
    <div>
      <h2>Crea un nuovo elemento</h2>
      <form onSubmit={handleSubmit}>
        <label>Tipo:</label>
        <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
          <option value="rapper">Rapper</option>
          <option value="muretto">Muretto</option>
        </select>

        <label>Nome:</label>
        <input type="text" value={valore} onChange={(e) => setValore(e.target.value)} required />

        {tipo === "rapper" && (
          <>
            <label>Muretto:</label>
            <input type="text" value={muretto} onChange={(e) => setMuretto(e.target.value)} required />
          </>
        )}

        {tipo === "muretto" && (
          <>
            <label>Alias:</label>
            <input type="text" value={alias} onChange={(e) => setAlias(e.target.value)} required />

            {/* Aggiunta Rapper al Muretto */}
            <h3>Aggiungi Rapper</h3>
            <input
              type="text"
              value={rapperNome}
              onChange={(e) => setRapperNome(e.target.value)}
              placeholder="Nome del rapper"
            />
            <button type="button" onClick={addRapperToList}>Aggiungi Rapper</button>

            {/* Mostra la lista dei rapper aggiunti */}
            <ul>
              {rapperList.map((rapper, index) => (
                <li key={index}>{rapper.nome}</li>
              ))}
            </ul>
          </>
        )}

        <button type="submit">Aggiungi</button>
      </form>
    </div>
  );
};

export default CreateItemForm;
