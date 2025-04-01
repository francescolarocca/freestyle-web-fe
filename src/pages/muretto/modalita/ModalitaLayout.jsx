import React, { useState, useEffect, useMemo } from 'react';
import { useOutletContext, useLocation } from 'react-router-dom';
import { Outlet } from 'react-router-dom'
import Accordion from '../../../components/ui/Accordion';
import RapperSelector from '../../../components/rapper/RapperSelector';
import Youtube from '../../../components/ui/Youtube';

function ModalitaLayout() {
  const location = useLocation();
  const videos = ["PL_v1QuCtH478I4LBek3LbTjiqyMlC151L&ab_channel=KidJimi"]
  const { muretto } = useOutletContext();

  const [selectedRappers, setSelectedRappers] = useState([]);


  const outletContext = useMemo(() => ({ muretto, selectedRappers }), [muretto, selectedRappers]);


  const [expandedSections, setExpandedSections] = useState({
    rappers: false,
    beat: false
  });
  useEffect(() => {
    console.log('selectedRappers:', selectedRappers);
  }, [expandedSections]);
  const isRootModalita = location.pathname === (`/muretto/${muretto.alias}/modalita`);
  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  return (
    <>
      {!isRootModalita &&
        <>
          <Accordion
            title="Selezione Rapper"
            isExpanded={expandedSections.rappers}
            onToggle={() => toggleSection('rappers')}
          >
            {<RapperSelector rappers={muretto.rapper} onSelectionChange={setSelectedRappers} rapperSelected={selectedRappers}></RapperSelector>}
          </Accordion>

          <Accordion
            title="Selezione Beat"
            isExpanded={expandedSections.beat}
            hideContent={true} 
            onToggle={() => toggleSection('beat')}
          >
            <Youtube videoUrls={videos} />
          </Accordion>
          </>
      }

      <Outlet context={outletContext} />
    </>
  );
}
export default ModalitaLayout;