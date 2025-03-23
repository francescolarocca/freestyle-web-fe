import React, { useState } from "react";
import { addMuretto } from "../../api"; // Funzione API per aggiungere un nuovo muretto
import "../../home.css";

const AddMurettoForm = ({ setShowAddForm }) => {
  const [alias, setAlias] = useState("");
  const [valore, setValore] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!alias || !valore ) {
      setErrorMessage("Tutti i campi sono obbligatori!");
      return;
    }

    try {
      const response = await addMuretto({ alias, valore });
      if (response) {
        
        // Muretto aggiunto con successo
        alert("Muretto aggiunto con successo!");
        setShowAddForm(false); // Chiudi il form dopo il successo
      } 
    } catch (error) {
      // Gestione dell'errore se qualcosa va storto
      setErrorMessage("Errore durante l'aggiunta del muretto2.");
      console.error(error);
    }
  };

  return (
    <div className="add-muretto-form">
      <h3>Aggiungi un nuovo Muretto</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome del Muretto:</label>
          <input
            type="text"
            value={alias}
            onChange={(e) => setAlias(e.target.value)}
            placeholder=""
          />
        </div>
        <div>
          <label>Città:</label>
          <input
            type="text"
            value={valore}
            onChange={(e) => setValore(e.target.value)}
            placeholder=" "
          />
        </div>
        <button type="submit">Aggiungi</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <button onClick={() => setShowAddForm(false)}>Annulla</button>
    </div>
  );
};

export default AddMurettoForm;
