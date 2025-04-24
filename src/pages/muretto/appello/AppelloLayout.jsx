import React, { useState, useEffect, useMemo } from 'react';
import { Outlet } from 'react-router-dom';
function AppelloLayout() {
 // fallback di sicurezza
  return (
  <Outlet ></Outlet>
  );
}

export default AppelloLayout;