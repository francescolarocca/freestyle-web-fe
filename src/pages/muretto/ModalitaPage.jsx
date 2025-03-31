import React from 'react';
import useOutletContext from 'react-router-dom';
function ModalitaPage() {
    const { muretto } = useOutletContext();
  
  const modalita = [
    { id: 1, name: "1v1", description: "1vs1 battaglia freestyle" },
    { id: 2, name: "2v2", description: "Sessione di gruppo" },
    { id: 3, name: "Time Attack", description: "60 secondi di fuoco" },
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Modalità</h2>
      
      <div className="space-y-4">
        {modalita.map((mode) => (
          <Card key={mode} onclickApply={() => navigate(`/muretto/${muretto.alias}/modalita`)} title='Appello' icon={"🤚"} ></Card>
        ))}
      </div>
    </div>
  );
}

export default ModalitaPage;