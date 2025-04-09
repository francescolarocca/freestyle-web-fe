import React from 'react';
import { Outlet } from 'react-router-dom'

function RapperLayout() {
  return (
    <>
      <Outlet />
    </>
  );
}
export default RapperLayout;