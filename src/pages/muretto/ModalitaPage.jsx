import React from 'react';
import {useOutletContext} from 'react-router-dom';
import Card from '../../components/ui/Card';
import {useNavigate} from 'react-router-dom';
function ModalitaPage() {
    const { muretto } = useOutletContext();
   const navigate = useNavigate();
  const modalita = [
    { id: 1, name: "1v1", description: "1vs1 classic",icon : "👥" },
    { id: 2, name: "2v2", description: "2v2 classic", icon: "👥 👥"},
    { id: 3, name: "Torneo", description: "60 secondi di fuoco",icon :"🏆"},
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      
      <div className="space-y-4">
        {modalita.map((mode) => (
          <Card key={mode.name} onclickApply={() => navigate(`/muretto/${muretto.alias}/modalita/OneVsOne`)} title={mode.name} icon={mode.icon} description={mode.description} ></Card>
        ))}
      </div>
    </div>
  );
}

export default ModalitaPage;