import React, {useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import RapperSelector from '../../../components/rapper/RapperSelector';
function OneVsOne() {
  const { muretto } = useOutletContext();

  const [selezionati, setSelezionati] = useState([]);

  const handleAvanti = () => {
    console.log('Rapper selezionati:', selezionati);
    // continua...
  };
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-primary">
        1 vs 1
      </h1>
    
      <div>
      <h2 className="text-2xl font-bold mb-4">Scegli i rapper</h2>
      <RapperSelector
        rappers={muretto.rapper}
        onSelectionChange={setSelezionati}
      />
      <button
        onClick={handleAvanti}
        className="mt-6 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Avanti
      </button>
    </div>

    </div>
  );
}

export default OneVsOne;