import React, { useState } from 'react';
import RankingRow from './RankingRow';
import RankingDetails from './RankingDetails';
import Modal from '../ui/Modal';
import PresenzaForm from '../ui/form/PresenzaForm';
import { addPresenza, deletePresenza, updateRapper } from '../../services/muretto';
import { useMuretto } from '../../pages/muretto/MurettoContext';
import { murettoContext } from '../../pages/muretto/MurettoContext';
import { useNotify } from '../../pages/muretto/context/NotifyContext.jsx';
import ModalConfirm from '../ui/ModalConfirm';
function RankingTable({ rapper }) {
  const muretto = useMuretto();
  const { setShowSuccess, setMessage } = useNotify();

  const { findMurettoByAlias } = murettoContext()
  const [showPopupDeletePresenzaModal, setShowPopupDeletePresenzaModal] = useState(false);
  const [rapperToUpdate, setRapperToUpdate] = useState("");

  const [presenzaToDelete, setPresenzaToDelete] = useState({});
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [newRankValue, setNewRankValue] = useState(0);
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
  const showConfirmDeletePresenza = (dataPresenza) => {
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
      moltiplicatore: data.moltiplicatore,
      descrizione: data.descrizione
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
  const toggleUpdate = (nome) => {
    setTextConfirmModal("Update")
    setShowModalUpdate(true);
    setRapperToUpdate(nome);
    setNewRankValue(muretto.rapper.find((r) => r.nome === nome).rank);

  }
  const aggiornaRank = async () => {
    console.log('Nuovo rank:', newRankValue);
    await updateRapper({
      tipo: muretto.tipo,
      valore: muretto.valore,
      nomeRapper: rapperToUpdate,
      newRank: newRankValue
    })
    setMessage("Rank aggiornato con successo!");
    setShowSuccess(true)
    setShowModalUpdate(false);
    findMurettoByAlias();
    setTimeout(() => {
      setShowSuccess(false);
    }, 1000);
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
              <RankingRow key={`${row.nome}-row`}
                row={row} toggleDetails={toggleDetails}
                toggleAddNew={toggleAddNew}
                toggleUpdate={toggleUpdate}
                posizione={(index + 1) + (currentPage!==1? (10* (currentPage-1)): 0)} />

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
      {(showModalUpdate &&
        <Modal title={"Aggiorna Rank di " + rapperToUpdate} >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Rank</label>
            <input
              type="number"
              name="rank"
              value={newRankValue}
              onChange={(e) => setNewRankValue(e.target.value)}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setShowModalUpdate(false)}
              className="px-4 py-2 rounded-lg bg-slate-200 text-slate-700 hover:bg-slate-300 transition"
            >
              Annulla
            </button>
            <button
              onClick={aggiornaRank}
              className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-red-600 transition"
            >
              Aggiorna
            </button>
          </div>
        </Modal>)}

      <ModalConfirm isOpen={showPopupDeletePresenzaModal} onConfirm={handleDeletePresenza} onCancel={() => setShowPopupDeletePresenzaModal(false)}></ModalConfirm>

    </>
  );
}


export default RankingTable;
