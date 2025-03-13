import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAllItems } from "../../api"; // Funzione API per aggiungere la presenza
import "../../../src/ranking.css"; // Il CSS comune per tutto
import VideoBackground from "./VideoBackground";
import RankingTable from "./RankingTable";
import AddRankingModal from "./AddRankingModal";
import RapperInfoModal from "./RapperInfoModal";
import "../../../src/rapperList.css";

const Ranking = () => {
  const { murettoName } = useParams();
  const [rapper, setRapper] = useState([]);
  const [showModal, setShowModal] = useState(false); // Modale per aggiungere presenza
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

  
  return (

    
    <div  className="container">

      <VideoBackground /> {/* Cambia con l'ID del video YouTube */}

      <h2 className="title2">Ranking {murettoName}</h2>
      
      
      <button className="btn-add" onClick={() => setShowModal(true)}>Aggiungi al Ranking</button>


      
      <AddRankingModal
         showModal={showModal}
         closeModal={() => setShowModal(false)}
         handleFormSubmit={() => {}}
         formData={formData}
         setFormData={setFormData}
         rapper={rapper}
       />

      {/* Tabella dei rapper */}
      <RankingTable rapper={rapper} openInfoModal={setSelectedRapper} />

     
      <RapperInfoModal
        showInfoModal={!!selectedRapper}
        closeInfoModal={() => setSelectedRapper(null)}
        selectedRapper={selectedRapper}
      />
      
    </div>
  );
};

export default Ranking;
