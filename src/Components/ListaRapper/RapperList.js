import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getAllItems, addRapper, deleteRapper, updateRapperNameRank } from '../../api'; // Aggiungi le nuove funzioni API
import "../../rapperList.css";
import RapperTable from './RapperTable';
import AddRapperForm from './AddRapperForm';
import UpdateRapperModal from './UpdateRapperModal';

const RapperList = () => {
  const { murettoId } = useParams();
  const [rapper, setRapper] = useState([]);
  const [newRapper, setNewRapper] = useState("");
  const [newRank, setNewRank] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [valore, setValore] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRapper, setSelectedRapper] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedRank, setUpdatedRank] = useState(0);

  useEffect(() => {
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

    fetchRappers();
  }, [murettoId]);

  const handleAddRapper = async () => {
    if (newRapper && newRank >= 0) {
      try {
        await addRapper(valore, murettoId, newRapper, newRank);
        alert("Rapper aggiunto con successo!");
        setNewRapper("");
        setNewRank(0);

        const responseItems = await getAllItems();
        const muretto = responseItems.find(item => item.alias === murettoId && item.tipo === "Muretto");
        setRapper(muretto?.rapper || []);
      } catch (error) {
        setErrorMessage("Errore durante l'aggiunta del rapper.");
      }
    } else {
      setErrorMessage("Inserisci il nome del rapper e un rank valido.");
    }
  };

  const handleDeleteRapper = async (nomeRapper) => {
    if (window.confirm(`Sei sicuro di voler eliminare ${nomeRapper}?`)) {
      try {
        await deleteRapper(valore, murettoId, nomeRapper);
        alert("Rapper eliminato con successo!");
        const responseItems = await getAllItems();
        const muretto = responseItems.find(item => item.alias === murettoId && item.tipo === "Muretto");
        setRapper(muretto?.rapper || []);
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
        setRapper(muretto?.rapper || []);
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
      <RapperTable rapper={rapper} openModal={openModal} handleDeleteRapper={handleDeleteRapper} />
      <UpdateRapperModal {...{ isModalOpen, closeModal, updatedName, setUpdatedName, updatedRank, setUpdatedRank, handleUpdateRank }} />
      <AddRapperForm {...{ newRapper, setNewRapper, newRank, setNewRank, handleAddRapper, errorMessage }} />
    </div>
  );
};

export default RapperList;