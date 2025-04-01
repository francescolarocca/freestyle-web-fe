import React from 'react';
import {useOutletContext} from 'react-router-dom';
import Card from '../../../components/ui/Card';
import {useNavigate} from 'react-router-dom';
function ModalitaPage() {
    const { muretto } = useOutletContext();
   const navigate = useNavigate();
  const modalita = [
    { id: 1, name: "1v1", description: "1vs1 classic",icon : "👥" },
    { id: 2, name: "2v2", description: "2vs2 classic", icon: "👥 👥"},
    { id: 3, name: "Torneo", description: "Chi vincerà?",icon :"🏆"},
  ];

  return (
    <div className="flex items-start justify-center px-5 py-5"> {/* ridotto padding */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-2xl">
        {modalita.map((mode) => (
          <Card key={mode.name} onclickApply={() => navigate(`/muretto/${muretto.alias}/modalita/OneVsOne`)} title={mode.name} icon={mode.icon} description={mode.description} ></Card>
        ))}
      </div>
    </div>
  );
}

export default ModalitaPage;