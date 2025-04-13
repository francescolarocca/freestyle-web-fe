import React, { useState } from 'react';
import RankingRow from './RankingRow';
import RankingDetails from './RankingDetails';
import Modal from '../ui/Modal';
import PresenzaForm from '../ui/form/PresenzaForm';
function RankingTable({ rapper }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [textConfirmModal, setTextConfirmModal] = useState("");
  const rappersPerPage = 10;
  const indexOfLast = currentPage * rappersPerPage;
  const indexOfFirst = indexOfLast - rappersPerPage;
  const currentRappers = rapper.slice(indexOfFirst, indexOfLast);
  const [expandedRapper, setExpandedRapper] = useState(null);
  const [showModalAddNew, setShowModalAddNew] = useState(false);
  const [formDataNewPresenza, setFormDataNewPresenza] = useState({
    data: '',
    tipo: '',
    posizionamento: '',
    luogo: '',
    descrizione: '',
  });
  const handleSubmitNewPresenza = (data) => {
    setShowModalAddNew(false);
    console.log('Nuova presenza:', data);
  }
  const toggleAddNew = () => {
    setTextConfirmModal("Aggiungi")
    setFormDataNewPresenza({
      data: '',
      tipo: '',
      posizionamento: '',
      luogo: '',
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
          <PresenzaForm onCancel={() => setShowModalAddNew(false)} onSubmit={handleSubmitNewPresenza} formData={formDataNewPresenza} setFormData={setFormDataNewPresenza} textConfirm={textConfirmModal}/>
        </Modal>)}
    </>
  );
}


export default RankingTable;
