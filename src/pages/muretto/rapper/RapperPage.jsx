import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import RapperList from '../../../components/rapper/RapperList';
import Button from '../../../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { useMuretto,murettoContext } from '../MurettoContext';
import { deleteRapper } from '../../../services/muretto';
import ModalConfirm from '../../../components/ui/ModalConfirm';
import { useNotify } from '../context/NotifyContext';
function RapperPage() {
  //gestione popup di conferma
  const { setShowSuccess, setMessage } = useNotify();
    const {findMurettoByAlias} = murettoContext()
  //state per il modale di conferma del rapper da eliminare
  const [showPopupDeleteModal, setShowPopupDeleteModal] = useState(false);
  const [rapperToDelete, setRapperToDelete] = useState({});
  const navigate = useNavigate();
  const muretto = useMuretto();
  function handleRapperClick(rapper) {
    navigate(`/muretto/${muretto.alias}/rapper/detail/${rapper.nome}`);
  }
  async function showConfirm(rapper) {
    setRapperToDelete(rapper);
    setShowPopupDeleteModal(true);
  }
  async function handleDeleteRapper() {
    await deleteRapper({ "valore": muretto.valore, "alias": muretto.alias, "nome": rapperToDelete.nome });
    findMurettoByAlias();
    setMessage('Rapper eliminato con successo!');
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
    }, 1000);
    setShowPopupDeleteModal(false);

    navigate(`/muretto/${muretto.alias}/rapper`);
  }
  function aggiungiRapper() {
    console.log('Aggiungi rapper:');
    console.log(muretto);
    navigate(`/muretto/${muretto.alias}/rapper/new`); // Naviga alla pagina di aggiunta rapper
  }
  return (
    <div className="min-h-screen bg-slate-100">
      <RapperList rappers={muretto?.rapper} onRapperClick={handleRapperClick} onDeleteRapper={showConfirm} />
      <ModalConfirm isOpen={showPopupDeleteModal} onConfirm={handleDeleteRapper} onCancel={() => setShowPopupDeleteModal(false)}></ModalConfirm>
      <div className='flex justify-center items-center mt-4'>
        <Button label="Aggiungi Rapper" onClick={aggiungiRapper}></Button>
      </div>
    </div>

  );
}

export default RapperPage;