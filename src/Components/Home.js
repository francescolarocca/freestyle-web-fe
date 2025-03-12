import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllItems } from "../api"; // Funzione API per ottenere tutti i dati
import "../home.css";

const Home = () => {
  const [muretti, setMuretti] = useState([]); // Stato per i muretti filtrati
  const [selectedMuretto, setSelectedMuretto] = useState(""); // Stato per il valore selezionato
  const navigate = useNavigate();

  // Recupera i dati e filtra solo i muretti
  useEffect(() => {
    const fetchMuretti = async () => {
      try {
        const data = await getAllItems(); // Ottiene tutti gli elementi (rapper + muretti)
        const murettiFiltered = data.filter(item => item.tipo.toLowerCase() === "muretto"); // Filtra solo i muretti
        setMuretti(murettiFiltered);
      } catch (error) {
        console.error("Errore nel recupero dei muretti:", error);
      }
    };

    fetchMuretti();
  }, []);

  // Funzione per gestire il pulsante "Avanti"
  const handleNext = () => {
    if (selectedMuretto) {
      navigate(`/muretto/${selectedMuretto}`); // Naviga alla pagina con il muretto selezionato
    } else {
      alert("Seleziona un muretto prima di procedere.");
    }
  };

  return (
    <>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
    <div className="body-rapho">
    <h1 className="header-rapho">Muretti Italia</h1>
    <div className="card-rapho">
      <h2>Seleziona un Muretto</h2>
      <select className="select-rapho mt-3 " value={selectedMuretto} onChange={(e) => setSelectedMuretto(e.target.value)}>
        <option value="">-- Scegli un muretto --</option>
        {muretti.map((muretto) => (
          <option key={muretto.id} value={muretto.alias}>
            {muretto.alias}
          </option>
        ))}
      </select>
      <button className="btnho btn-rapho mt-4 " onClick={handleNext}>Avanti</button>
    </div>
  </div>
  </>
);

};

export default Home;
