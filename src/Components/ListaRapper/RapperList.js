import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getAllItems, addRapper, deleteRapper, updateRapperNameRank } from '../../api'; // Importa uploadAvatar
import "../../rapperList.css";
import RapperTable from './RapperTable';
import AddRapperForm from './AddRapperForm';
import UpdateRapperModal from './UpdateRapperModal';


const RapperList = () => {
  const { murettoId } = useParams();
  const [rapper, setRapper] = useState([]);
  const [rapperData, setRapperData] = useState({
    nome: "",
    rank: "",
    bio: "",
    avatarUrl: "",
    spotifyLink: "",
    soundcloudLink: "",
    instagramLink: ""
  });
  const [selectedFile, setSelectedFile] = useState(null);  // Stato per il file
  const [errorMessage, setErrorMessage] = useState("");
  const [valore, setValore] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRapper, setSelectedRapper] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedRank, setUpdatedRank] = useState(0);

  useEffect(() => {
    fetchRappers();
  }, [murettoId]);

  const fetchRappers = async () => {
    try {
      const response = await getAllItems();
      const muretto = response.find(item => item.alias === murettoId && item.tipo === "Muretto");
      setValore(muretto?.valore || "");
      setRapper(muretto?.rapper || []);
    } catch (error) {
      console.error("Errore nel recupero dei rapper", error);
    }
  };

  const handleAddRapper = async () => {
    if (rapperData.nome && rapperData.rank >= 0) {
      try {
        // 1️⃣ Creazione del rapper
        await addRapper(valore, murettoId, rapperData);
        console.log("Rapper creato con successo!");
  
        // 2️⃣ Se c'è un file, aspetta la creazione e poi carica l'avatar
        if (rapperData.avatar) {
          console.log("Avvio upload avatar...");
          const formData = new FormData();
          formData.append("avatar", rapperData.avatar);
  
          const response = await fetch(
            `http://localhost:8080/murettifreestyle/upload-avatar/Muretto/${valore}/${rapperData.nome}/${murettoId}`,
            {
              method: "POST",
              body: formData,
            }
          );
  
          const data = await response.json();
          console.log("Avatar caricato con successo:", data.avatarUrl);
        }
  
        // 3️⃣ Aggiorna la lista dopo tutto il processo
        const responseItems = await getAllItems();
        const muretto = responseItems.find(item => item.alias === murettoId && item.tipo === "Muretto");
        setRapper(muretto?.rapper || []);
        setErrorMessage("");
  
        // 4️⃣ Reset del form
        setRapperData({
          nome: "",
          rank: "",
          bio: "",
          avatar: null,
          spotifyLink: "",
          soundcloudLink: "",
          instagramLink: ""
        });
  
      } catch (error) {
        console.error("Errore durante l'aggiunta del rapper o upload avatar", error);
        setErrorMessage("Errore durante l'aggiunta del rapper.");
      }
    } else {
      setErrorMessage("Compila almeno nome e un rank valido.");
    }
  };
  const handleDeleteRapper = async (nomeRapper) => {
    if (window.confirm(`Sei sicuro di voler eliminare ${nomeRapper}?`)) {
      try {
        const nomePulito = nomeRapper.trim();
        await deleteRapper(valore, murettoId, nomePulito);
        alert("Rapper eliminato con successo!");
        fetchRappers();
      } catch (error) {
        setErrorMessage("Errore durante l'eliminazione del rapper.");
      }
    }
  };
  const openModal = (rapperItem) => {
    setSelectedRapper(rapperItem);
    setUpdatedName(rapperItem.nome);
    setUpdatedRank(rapperItem.rank);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setUpdatedName("");
    setUpdatedRank(0);
  };

  const handleUpdateRank = async () => {
    if (updatedName && updatedRank >= 0) {
      try {
        await updateRapperNameRank(valore, selectedRapper.nome, updatedName, updatedRank);
        alert("Rank e nome del rapper aggiornati con successo!");

        const responseItems = await getAllItems();
        const muretto = responseItems.find(item => item.alias === murettoId && item.tipo === "Muretto");
        setRapper(muretto?.rapper.trim() || []);
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
      <RapperTable rapper={rapper} handleDeleteRapper={handleDeleteRapper} openModal={openModal} />
      <UpdateRapperModal {...{ openModal,isModalOpen, closeModal, updatedName, setUpdatedName, updatedRank, setUpdatedRank, handleUpdateRank }} />
      <AddRapperForm 
        rapperData={rapperData} 
        setRapperData={setRapperData} 
        handleAddRapper={handleAddRapper} 
        setSelectedFile={setSelectedFile} // Passiamo la gestione dell'upload
        errorMessage={errorMessage} 
        murettoId={murettoId} 
        valore={valore} 
      />
    </div>
  );
};

export default RapperList;
