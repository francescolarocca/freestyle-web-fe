import React, { useState,useEffect,useMemo } from 'react';
import { useParams,useLocation } from 'react-router-dom';
import { Outlet } from 'react-router-dom'
import { findAllMuretti } from '../../services/muretto';
import { MurettoContext } from './MurettoContext';

function MurettoLayout() {
  const {aliasMuretto} = useParams();
  const [title, setPageTitle] = useState(`${aliasMuretto} Dashboard`);
  const [muretto, setMuretto] = useState({});
  const value = useMemo(() => (muretto), [muretto]);
  const location = useLocation();
  useEffect(() => {

    /**GESTIONE ROUTE TITLES *************/
    const routeTitles = {
      'ranking': `${aliasMuretto} Ranking`,
      'rapper': `${aliasMuretto} Rapper`,
      'modalita': `${aliasMuretto} Modalita`,
      'OneVsOne': `${aliasMuretto} Modalita 1vs1`,
      'TwoVsTwo': `${aliasMuretto} Modalita 2vs2`,
      'new-rapper': `${aliasMuretto} Aggiungi Rapper`,
    };
    const parts = location.pathname.split('/');
    const last = parts[parts.length - 1];
    setPageTitle(routeTitles[last] || `${aliasMuretto} Dashboard`);
    /*********************************** */
    
    /**RECUPERO DEL MURETTO CONDIVIDENDOLO CON LE PAGINE <OUTLET> FIGLIE ********/
    async function findMurettoByAlias() {
      const result = await findAllMuretti();
      setMuretto(result.data.find(i => i.alias === aliasMuretto));
    }
    findMurettoByAlias();

    console.log("MurettoLayout montato con muretto:", muretto);
    console.log("MurettoLayout:", value);
    console.log("Alias", aliasMuretto);

    /*******************************************/
  }, [location]);
  
  return (
    <MurettoContext.Provider value={{value} }>
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-primary">
        {title}
      </h1>
      <Outlet /> {/* Qui va la pagina figlia: dashboard, ranking... a cui viene passato il muretto */}
    </div>
    </MurettoContext.Provider>
  );
}

export default MurettoLayout;