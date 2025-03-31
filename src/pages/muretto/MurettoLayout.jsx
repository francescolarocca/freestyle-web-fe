import React, { useState,useEffect } from 'react';
import { useParams,useLocation } from 'react-router-dom';
import { Outlet } from 'react-router-dom'
import { findAllMuretti } from '../../services/muretto';
function MurettoLayout() {
  const { id } = useParams();
  const [title, setPageTitle] = useState(`${id} Dashboard`);
  const [muretto, setMuretto] = useState({});

  const location = useLocation();
  useEffect(() => {
    
    /**GESTIONE ROUTE TITLES *************/
    const routeTitles = {
      'ranking': `${id} Ranking`,
      'rapper': `${id} Rapper`,
      'modalita': `${id} Modalita`,
    };
    const parts = location.pathname.split('/');
    const last = parts[parts.length - 1];
    setPageTitle(routeTitles[last] || `${id} Dashboard`);
    /*********************************** */
    
    /**RECUPERO DEL MURETTO CONDIVIDENDOLO CON LE PAGINE <OUTLET> FIGLIE ********/
    async function findMurettoByAlias() {
      const result = await findAllMuretti();
      setMuretto(result.data.find(i => i.alias === id));
    }
    findMurettoByAlias();
    /*******************************************/
  }, [location]);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-primary">
        {title}
      </h1>
      <Outlet context={{ muretto }}/> {/* Qui va la pagina figlia: dashboard, ranking... a cui viene passato il muretto */}
    </div>
  );
}

export default MurettoLayout;