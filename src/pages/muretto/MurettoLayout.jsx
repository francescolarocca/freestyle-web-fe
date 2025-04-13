import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom'
import { findAllMuretti } from '../../services/muretto';
import { MurettoContext } from './MurettoContext';
import { NotifyContext } from './context/NotifyContext';
import Notify from '../../components/ui/Notify';
function MurettoLayout() {

  // stato di caricamento e errore
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  // Recupero i parametri della route
  const { aliasMuretto } = useParams();
  const { nomeRapper } = useParams();
  // stato per il titolo della pagina e per le info del muretto
  const [title, setPageTitle] = useState(`${aliasMuretto} Dashboard`);
  const [muretto, setMuretto] = useState(null);

  // stato per i messaggi di notifica
  const [message, setMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  // oggetto location per fare i routing
  const location = useLocation();

  // funzione per recuperare il muretto
  const findMurettoByAlias = async () => {

    const result = await findAllMuretti();
    console.log('call findMurettoByAlias')
    setMuretto(result.data.find(i => i.alias === aliasMuretto));
    setLoading(false);

  }

  // initial loading state
  useEffect(() => {

    /**GESTIONE ROUTE TITLES *************/
    const routeTitles = {
      'ranking': `${aliasMuretto} Ranking`,
      'rapper': `${aliasMuretto} Rapper`,
      'modalita': `${aliasMuretto} Modalita`,
      'OneVsOne': `${aliasMuretto} Modalita 1vs1`,
      'TwoVsTwo': `${aliasMuretto} Modalita 2vs2`,
      'new': `${aliasMuretto} Aggiungi Rapper`,
      [nomeRapper]: `${nomeRapper} `
    };
    const parts = location.pathname.split('/');
    const last = parts[parts.length - 1];
    console.log("Ultimo elemento della route:", last);
    console.log(routeTitles);
    setPageTitle(routeTitles[last] || `${aliasMuretto} Dashboard`);
    /*********************************** */

    /**RECUPERO DEL MURETTO CONDIVIDENDOLO CON LE PAGINE <OUTLET> FIGLIE ********/

    if (!muretto) {
      setLoading(true);
      setError(null);
      findMurettoByAlias();
    }


    /*******************************************/
  }, [location]);

  if (loading) return <div className="text-center p-6">Caricamento...</div>;
  if (error) return <div className="text-red-500 text-center p-6">{error}</div>;
  if (!muretto) return null; // fallback di sicurezza
  return (
    <NotifyContext.Provider value={{ showSuccess, setShowSuccess, message, setMessage }}>
      <Notify message={message} showSuccess={showSuccess} />
      <MurettoContext.Provider value={{ muretto, findMurettoByAlias }}>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-center mb-8 text-primary">
            {title}
          </h1>

          <Outlet /> {/* Qui va la pagina figlia: dashboard, ranking... a cui viene passato il muretto */}
          <div className="flex items-start justify-center px-4 py-4"> {/* ridotto padding */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
            <button
          onClick={() => navigate(location.pathname.split('/').slice(0, -1).join('/'))}
          className="flex items-center text-blue-600 hover:text-blue-800 font-semibold"
        >
          ← <span className="ml-1">Indietro</span>
        </button>
            </div>
          </div>

        </div>
      </MurettoContext.Provider>
    </NotifyContext.Provider>
  );
}

export default MurettoLayout;