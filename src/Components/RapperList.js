import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getAllItems, addRapper, deleteRapper, updateRapperNameRank } from '../api'; // Aggiungi le nuove funzioni API
import "../rapperList.css";
const RapperList = () => {
  const { murettoId } = useParams();  // Recupera il parametro murettoId
  const [rapper, setRapper] = useState([]); // Stato per i rapper
  const [newRapper, setNewRapper] = useState(""); // Stato per il nuovo rapper
  const [newRank, setNewRank] = useState(0); // Stato per il rank del rapper
  const [errorMessage, setErrorMessage] = useState(""); // Stato per il messaggio di errore
  const [valore, setValore] = useState("");

  // Stato per la finestra modale di aggiornamento
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRapper, setSelectedRapper] = useState(null);
  const [updatedName, setUpdatedName] = useState('');
  const [updatedRank, setUpdatedRank] = useState(0);

  // Recupera i rapper del muretto
  useEffect(() => {
    const fetchRappers = async () => {
      try {
        const response = await getAllItems();  // Recupera tutti gli oggetti
        const muretto = response.find(item => item.alias === murettoId && item.tipo === 'Muretto');
        setValore(muretto.valore);
        
        if (muretto && muretto.rapper) {
          setRapper(muretto.rapper); // Imposta i rapper del muretto
        } else {
          console.log("Muretto non trovato o non ha rapper.");
        }
      } catch (error) {
        console.error("Errore nel recupero dei rapper", error);
      }
    };

    fetchRappers();
  }, [murettoId]); // Quando murettoId cambia, ricarica i rapper

  // Funzione per aggiungere un nuovo rapper
  const handleAddRapper = async () => {
    if (newRapper && newRank >= 0) {
      try {
        // Chiamata all'API per aggiungere il rapper, usando l'alias come parametro murettoId
        const response = await addRapper(valore, murettoId, newRapper, newRank);
        
        // Mostra il messaggio di successo
        alert("Rapper aggiunto con successo!");

        // Azzera i campi del form
        setNewRapper("");
        setNewRank(0);

        // Ricarica la lista dei rapper
        const responseItems = await getAllItems();
        const muretto = responseItems.find(item => item.alias === murettoId && item.tipo === 'Muretto');
        setRapper(muretto?.rapper || []);
      } catch (error) {
        // Gestisci l'errore
        setErrorMessage("Errore durante l'aggiunta del rapper.");
      }
    } else {
      setErrorMessage("Inserisci il nome del rapper e un rank valido.");
    }
  };

  // Funzione per eliminare un rapper
  const handleDeleteRapper = async (nomeRapper) => {
    const isConfirmed = window.confirm(`Sei sicuro di voler eliminare ${nomeRapper}?`);
  
    if (isConfirmed) {
      try {
        await deleteRapper(valore, murettoId, nomeRapper);
  
        alert("Rapper eliminato con successo!");
        const responseItems = await getAllItems();
        const muretto = responseItems.find(item => item.alias === murettoId && item.tipo === 'Muretto');
        setRapper(muretto?.rapper || []);
      } catch (error) {
        setErrorMessage("Errore durante l'eliminazione del rapper.");
      }
    }
  };
  

  // Funzione per aprire la finestra modale di aggiornamento
  const openModal = (rapperItem) => {
    setSelectedRapper(rapperItem);
    setUpdatedName(rapperItem.nome);
    setUpdatedRank(rapperItem.rank);
    setIsModalOpen(true);
  };

  // Funzione per chiudere la finestra modale
  const closeModal = () => {
    setIsModalOpen(false);
    setUpdatedName('');
    setUpdatedRank(0);
  };

  // Funzione per aggiornare il nome e rank del rapper
  const handleUpdateRank = async () => {
    if (updatedName && updatedRank >= 0) {
      try {
        // Chiamata all'API per aggiornare il rapper
        await updateRapperNameRank(valore, selectedRapper.nome, updatedName, updatedRank);

        // Mostra il messaggio di successo
        alert("Rank e nome del rapper aggiornati con successo!");

        // Ricarica la lista dei rapper
        const responseItems = await getAllItems();
        const muretto = responseItems.find(item => item.alias === murettoId && item.tipo === 'Muretto');
        setRapper(muretto?.rapper || []);
        
        // Chiudi la finestra modale
        closeModal();
      } catch (error) {
        setErrorMessage("Errore durante l'aggiornamento del rank.");
      }
    } else {
      setErrorMessage("Inserisci un nome e un rank valido.");
    }
  };

  return (
    <div className="container">
  <h2 className="title">Lista dei rapper {murettoId}</h2>

  {/* Lista dei rapper */}
  <table className="rapper-table">
    <thead>
      <tr>
        <th>Nome</th>
        <th>Rank</th>
        <th>Azione</th> 
      </tr>
    </thead>
    <tbody>
      {rapper.length > 0 ? (
        rapper.map((rapperItem) => (
          <tr key={rapperItem.nome}>
            <td>{rapperItem.nome}</td>
            <td>{rapperItem.rank}</td>
            <td>
              {/* Bottone per aprire la finestra modale di aggiornamento */}
              <button className="btn btn-update" onClick={() => openModal(rapperItem)}>
                Aggiorna Rank e Nome
              </button>
              
              <button className="btn btn-delete" onClick={() => handleDeleteRapper(rapperItem.nome)}>
                Elimina
              </button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="3" className="no-rapper">Nessun rapper trovato per questo muretto.</td>
        </tr>
      )}
    </tbody>
  </table>

  {/* Modale per aggiornare il nome e rank del rapper */}
  {isModalOpen && (
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
  )}

  {/* Form per aggiungere un nuovo rapper */}
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

export default RapperList;
