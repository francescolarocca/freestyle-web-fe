import React from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import Card from '../../components/ui/Card';
function MurettoDashboardPage() {
  const { aliasMuretto } = useParams();
  
   const navigate = useNavigate();
  return (    
      <div className="flex items-start justify-center px-4 py-4"> {/* ridotto padding */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
        <Card key="ranking" onclickApply={() => navigate(`/muretto/${aliasMuretto}/ranking`)} title='Ranking' icon={"📈"} ></Card>
        <Card key="modalita" onclickApply={() => navigate(`/muretto/${aliasMuretto}/modalita`)} title='Modalità' icon={"🎮"} ></Card>
        <Card key="rapper" onclickApply={() => navigate(`/muretto/${aliasMuretto}/rapper`)} title='Rapper' icon={"🎙️"} ></Card>
        <Card key="appello" onclickApply={() => navigate(`/muretto/${aliasMuretto}/ranking`)} title='Appello' icon={"🤚"} ></Card>
      </div>
    </div>
  );
}

export default MurettoDashboardPage;