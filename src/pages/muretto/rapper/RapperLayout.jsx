import React, {useState} from 'react';
import { Outlet } from 'react-router-dom'
import { useNotify } from '../context/NotifyContext';
function RapperLayout() {

  return (
    <>
      <Outlet />
    </>
  );
}
export default RapperLayout;