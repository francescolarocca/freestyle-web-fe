import { useState } from 'react';

import React from 'react';

const RapperSelector = ({ rappers = [], rapperSelected, onSelectionChange }) => {

 
  const toggleRapper = (nome) => {
    const isSelected = rapperSelected.includes(nome);
    const updated = isSelected
      ? rapperSelected.filter((r) => r !== nome)
      : [...rapperSelected, nome];

    console.log("Chiamo la funzione di callback con:", updated);

    onSelectionChange?.(updated); // notifica al genitore
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {rappers.map((rapper) => (
        <div
          key={rapper.nome}
          onClick={() => toggleRapper(rapper.nome)}
          className={`cursor-pointer p-4 rounded-lg border text-center font-semibold transition
            ${rapperSelected.includes(rapper.nome)
              ? 'bg-blue-600 text-white border-blue-600'
              : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-100'}
          `}
        >
          {rapper.nome}
        </div>
      ))}
    </div>
  );
};

export default RapperSelector;