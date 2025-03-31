import React, { useState,useEffect } from 'react';
import { useParams,useLocation,useOutletContext} from 'react-router-dom';
import { Outlet } from 'react-router-dom'
function ModalitaLayout() {

const { muretto } = useOutletContext();
  return (
    <Outlet context={{ muretto }}/>
  );
}
export default ModalitaLayout;