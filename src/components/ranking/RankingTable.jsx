import React, { useState } from 'react';
import RankingRow from './RankingRow';
import RankingDetails from './RankingDetails';
import Modal from '../ui/Modal';
import PresenzaForm from '../ui/form/PresenzaForm';
import { addPresenza, deletePresenza } from '../../services/muretto';
import { useMuretto } from '../../pages/muretto/MurettoContext';
import { murettoContext } from '../../pages/muretto/MurettoContext';
import { useNotify } from '../../pages/muretto/context/NotifyContext.jsx';
import ModalConfirm from '../ui/ModalConfirm';
function RankingTable({ rapper }) {
  const muretto = useMuretto();
  const { setShowSuccess, setMessage } = useNotify();

  const { findMurettoByAlias } = murettoContext()
  const [showPopupDeletePresenzaModal, setShowPopupDeletePresenzaModal] = useState(false);
  const [presenzaToDelete, setPresenzaToDelete] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [textConfirmModal, setTextConfirmModal] = useState("");
  const rappersPerPage = 10;
  const indexOfLast = currentPage * rappersPerPage;
  const indexOfFirst = indexOfLast - rappersPerPage;
  const currentRappers = rapper.slice(indexOfFirst, indexOfLast);
  const [expandedRapper, setExpandedRapper] = useState(null);
  const [showModalAddNew, setShowModalAddNew] = useState(false);
  const [formDataNewPresenza, setFormDataNewPresenza] = useState({
    nomeRapper: '',
    data: '',
    evento: '',
    posizionamento: '',
    moltiplicatore: '',
    descrizione: '',
  });
  const showConfirmDeletePresenza = (dataPresenza) =>  { 
    setPresenzaToDelete(dataPresenza);
    setShowPopupDeletePresenzaModal(true);
  }
  const handleDeletePresenza = async () => {

    const deletePresenzaRequest = {
      valore: muretto.valore,
      nome: expandedRapper,
      data: presenzaToDelete,
    }
    await deletePresenza(deletePresenzaRequest);
    setShowPopupDeletePresenzaModal(false);

    setMessage("Presenza eliminata con successo!");
    setShowSuccess(true)
    findMurettoByAlias();
    setTimeout(() => {
      setShowSuccess(false);
    }, 1000);

  }
  const handleSubmitNewPresenza = async (data) => {
    setShowModalAddNew(false);
    const addPresenzaRequest = {
      tipo: muretto.tipo,
      valore: muretto.valore,
      nomeRapper: formDataNewPresenza.nomeRapper,
      data: new Date(data.data).toISOString(),
      evento: data.evento,
      posizionamento: data.posizionamento,
      moltiplicatore: data.moltiplicatore
    }
    await addPresenza(addPresenzaRequest);
    setMessage("Presenza aggiunta con successo!");
    setShowSuccess(true)
    findMurettoByAlias();
    setTimeout(() => {
      setShowSuccess(false);
    }, 1000);
    console.log('Nuova presenza:', data);
  }
  const toggleAddNew = (nome) => {
    setTextConfirmModal("Aggiungi")
    setFormDataNewPresenza({
      nomeRapper: nome,
      data: '',
      evento: '',
      posizionamento: '',
      moltiplicatore: '',
      descrizione: '',
    })
    setShowModalAddNew((prev) => !prev);
  }
  const toggleDetails = (nome) => {
    setExpandedRapper((prev) => (prev === nome ? null : nome));
  };
  return (

    <>
      <table className="w-full text-sm text-left text-gray-700 overflow-hidden">
        <thead className="bg-gray-200 text-gray-600 uppercase text-xs">
          <tr>
            <th className="px-2 py-3 w-1">Pos.</th>
            <th className="px-6 py-3 ">Nome</th>
            <th className="px-6 py-3">Rank</th>
            <th className="px-6 py-3 ">azioni</th>
          </tr>
        </thead>
        <tbody>

          {currentRappers.map((row, index) => (
            <>
              <RankingRow key={`${row.nome}-row`} row={row} toggleDetails={toggleDetails} toggleAddNew={toggleAddNew} posizione={index + 1} />

              {expandedRapper === row.nome &&
                <RankingDetails
                  key={`${row.nome}-details`}
                  presenze={row.presenze}
                  onDelete={showConfirmDeletePresenza}
                />}
            </>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center items-center space-x-2 mt-4">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          ← Indietro
        </button>
        <span className="text-sm font-medium">{currentPage}</span>
        <button
          onClick={() =>
            setCurrentPage(prev =>
              prev < Math.ceil(rapper.length / rappersPerPage) ? prev + 1 : prev
            )
          }
          disabled={currentPage >= Math.ceil(rapper.length / rappersPerPage)}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Avanti →
        </button>
      </div>


      {(showModalAddNew &&
        <Modal >
          <PresenzaForm onCancel={() => setShowModalAddNew(false)} onSubmit={handleSubmitNewPresenza} formData={formDataNewPresenza} setFormData={setFormDataNewPresenza} textConfirm={textConfirmModal} />
        </Modal>)}

        <ModalConfirm isOpen={showPopupDeletePresenzaModal} onConfirm={handleDeletePresenza} onCancel={() => setShowPopupDeletePresenzaModal(false)}></ModalConfirm>

    </>
  );
}


export default RankingTable;
