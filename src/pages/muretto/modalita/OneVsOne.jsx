import React, {useState } from 'react';
import { useOutletContext } from 'react-router-dom';
function OneVsOne() {
  const { selectedRappers } = useOutletContext();
  return (
   <>
   <div>{JSON.stringify(selectedRappers)}</div>
   </>
  );
}

export default OneVsOne;