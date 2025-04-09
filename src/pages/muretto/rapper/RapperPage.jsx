import React from 'react';
import { useOutletContext } from 'react-router-dom';
import RapperList from '../../../components/rapper/RapperList';
import Button from '../../../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { useMuretto } from '../MurettoContext';
function RapperPage() {
  const navigate = useNavigate();
  const  muretto  = useMuretto();
  function handleRapperClick(rapper) {
    console.log('Rapper clicked:', rapper);
  }
  function aggiungiRapper() {
    console.log('Aggiungi rapper:');
    navigate(`/muretto/${muretto.alias}/rapper/new`); // Naviga alla pagina di aggiunta rapper
  }
  return (
    <div className="min-h-screen bg-slate-100">
      <RapperList rappers={muretto?.rapper} onRapperClick={handleRapperClick} />
      <div className='flex justify-center items-center mt-4'>
        <Button label="Aggiungi Rapper" onClick={aggiungiRapper}></Button>
      </div>
    </div>

  );
}

export default RapperPage;