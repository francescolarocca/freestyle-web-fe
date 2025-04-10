import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Outlet } from 'react-router-dom'
import { findAllMuretti } from '../../services/muretto';
import { MurettoContext } from './MurettoContext';
import { NotifyContext, useNotify } from './context/NotifyContext';
import Notify from '../../components/ui/Notify';
function MurettoLayout() {
  // Recupero i parametri della route
  const { aliasMuretto } = useParams();
  const { nomeRapper } = useParams();
  // stato per il titolo della pagina e del muretto
  const [title, setPageTitle] = useState(`${aliasMuretto} Dashboard`);
  const [muretto, setMuretto] = useState(null);

  const value = useMemo(() => (muretto), [muretto]);
  const [message, setMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const location = useLocation();
  async function findMurettoByAlias() {
    const result = await findAllMuretti();
    setMuretto(result.data.find(i => i.alias === aliasMuretto));
  }
  useEffect(() => {

    /**GESTIONE ROUTE TITLES *************/
    const routeTitles = {
      'ranking': `${aliasMuretto} Ranking`,
      'rapper': `${aliasMuretto} Rapper`,
      'modalita': `${aliasMuretto} Modalita`,
      'OneVsOne': `${aliasMuretto} Modalita 1vs1`,
      'TwoVsTwo': `${aliasMuretto} Modalita 2vs2`,
      'new': `${aliasMuretto} Aggiungi Rapper`,
       [nomeRapper] : `${nomeRapper} `
    };
    const parts = location.pathname.split('/');
    const last = parts[parts.length - 1];
    console.log("Ultimo elemento della route:", last);
    console.log(routeTitles);
    setPageTitle(routeTitles[last] || `${aliasMuretto} Dashboard`);
    /*********************************** */

    /**RECUPERO DEL MURETTO CONDIVIDENDOLO CON LE PAGINE <OUTLET> FIGLIE ********/
   
   if(muretto == null){
     findMurettoByAlias();
   }

    console.log("MurettoLayout:", value);
    console.log("Alias", aliasMuretto);

    /*******************************************/
  }, [location]);

  return (
    <NotifyContext.Provider value={{ showSuccess, setShowSuccess, message, setMessage }}>
      <Notify message={message} showSuccess={showSuccess} />
      <MurettoContext.Provider value={{ value, findMurettoByAlias }}>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-center mb-8 text-primary">
            {title}
          </h1>
          <Outlet /> {/* Qui va la pagina figlia: dashboard, ranking... a cui viene passato il muretto */}
        </div>
      </MurettoContext.Provider>
    </NotifyContext.Provider>
  );
}

export default MurettoLayout;