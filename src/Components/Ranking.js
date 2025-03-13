import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAllItems } from "../api"; // Funzione API per aggiungere la presenza
import "../ranking.css"; // Il CSS comune per tutto
import VideoBackground from "./VideoBackground";
import "../rapperList.css";

const Ranking = () => {
  const { murettoName } = useParams();
  const [rapper, setRapper] = useState([]);
  const [showModal, setShowModal] = useState(false); // Modale per aggiungere presenza
  const [showInfoModal, setShowInfoModal] = useState(false); // Modale per info rapper
  const [selectedRapper, setSelectedRapper] = useState(null); // Rapper selezionato per il modale info
  const [formData, setFormData] = useState({
    data: new Date().toISOString(), // Data di oggi in formato yyyy-mm-dd
    evento:"",
    posizionamento: "",
    moltiplicatore: "",
  });

  const dataModal = new Date();

  // Funzione per recuperare i rapper dal muretto
  useEffect(() => {
    const fetchRappers = async () => {
      try {
        const response = await getAllItems();
        const muretto = response.find(item => item.alias === murettoName && item.tipo === 'Muretto');
        
        if (muretto && muretto.rapper) {
          const sortedRappers = muretto.rapper.sort((a, b) => b.rank - a.rank);
          setRapper(muretto.rapper); // Imposta i rapper del muretto
        } else {
          console.log("Muretto non trovato o non ha rapper.");
        }
      } catch (error) {
        console.error("Errore nel recupero dei rapper", error);
      }
    };

    fetchRappers();
  }, [murettoName]);

  // Funzione per aprire il modale per aggiungere presenza
  const openModal = () => {
    setShowModal(true); // Mostra il modale
  };

  // Funzione per chiudere il modale di presenza
  const closeModal = () => {
    setShowModal(false); // Nascondi il modale
  };

  // Funzione per aprire il modale per le informazioni del rapper
  const openInfoModal = (rapper) => {
    setSelectedRapper(rapper); // Imposta il rapper selezionato
    setShowInfoModal(true);  // Mostra il modale info
  };

  // Funzione per chiudere il modale delle info
  const closeInfoModal = () => {
    setShowInfoModal(false); // Nascondi il modale delle info
    setSelectedRapper(null);  // Resetta il rapper selezionato
  };

  // Funzione per gestire l'invio del form per aggiungere una presenza
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const jsonData = {
      data: new Date(formData.data).toISOString(),
      evento:formData.evento,
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
        alert('Appello creato con successo!');
        closeModal(); // Chiudi il modale
        const response = await getAllItems();
        const muretto = response.find(item => item.alias === murettoName && item.tipo === 'Muretto');
        const sortedRappers = muretto.rapper.sort((a, b) => b.rank - a.rank);
        setRapper(muretto.rapper); // Imposta i rapper del muretto
      } else {
        throw new Error('Errore nella creazione dell\'appello');
      }
    } catch (error) {
      console.error('Errore:', error);
      alert('Si è verificato un errore.');
    }
  };

  return (

    
    <div  className="container">

      <VideoBackground /> {/* Cambia con l'ID del video YouTube */}

      <h2 className="title2">Ranking {murettoName}</h2>
      
      
      <button className="btn-add" onClick={openModal}>Aggiungi al Ranking</button>

      
      {showModal && (
        <div className="modal-content">
          <div className="modal-form">
            <button className="close-modal" onClick={closeModal}>X</button>
            <h2>Aggiungi al Ranking</h2>
            <form onSubmit={handleFormSubmit}>
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

              <input
                type="text"
                placeholder="Evento"
                value={formData.evento}
                onChange={(e) => setFormData({ ...formData, evento: e.target.value })}
                required
              />

              <input
                type="date"
                value={formData.data}
                onChange={(e) => setFormData({ ...formData, data: e.target.value })}
                required
              />

              <select
                value={formData.moltiplicatore}
                onChange={(e) => setFormData({ ...formData, moltiplicatore: e.target.value })}
              >
                <option value="casa">Casa</option>
                <option value="regionale">Regionale</option>
              </select>

              <select
                value={formData.posizionamento}
                onChange={(e) => setFormData({ ...formData, posizionamento: e.target.value })}
              >
                <option value="ottavi">ottavi</option>
                <option value="quarti">quarti</option>
                <option value="semifinale">semifinale</option>
                <option value="finale">finale</option>
              </select>

              <button type="submit" className="btn-save">Aggiungi</button>
            </form>
          </div>
        </div>
      )}

      {/* Tabella dei rapper */}
      <table className="rapper-table">
        <thead>
          <tr>
            <th>Posizione</th>
            <th>Nome</th>
            <th>Rank</th>
            <th>Info</th>
          </tr>
        </thead>
        <tbody>
          {rapper.length > 0 ? (
            rapper.map((rapperItem, index) => (
              <tr key={rapperItem.nome}>
                <td>{index + 1}</td> 
                <td>{rapperItem.nome}</td>
                <td>{rapperItem.rank}</td>
                <td>
                  <button className="btn-info" onClick={() => openInfoModal(rapperItem)}>Info</button> 
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">Nessun rapper trovato per questo muretto.</td>
            </tr>
          )}
        </tbody>
      </table>

     
      {showInfoModal && selectedRapper && (
        <div className="modal-content">
          <div className="modal-form">
            <button className="close-modal" onClick={closeInfoModal}>X</button>
            <h2>{selectedRapper.nome} </h2>
            <ul className="rapper-list">
              {selectedRapper.presenze && selectedRapper.presenze.length > 0 ? (
                selectedRapper.presenze.map((presenza, index) => (
                  <li key={index}>
                    <span>{dataModal.toISOString(presenza.data).split('T')[0]} - {presenza.evento} - {presenza.punteggio}</span>
                  </li>
                ))
              ) : (
                <li>Nessuna presenza registrata.</li>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Ranking;
