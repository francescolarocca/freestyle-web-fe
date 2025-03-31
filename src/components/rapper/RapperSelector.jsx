import { useState } from 'react';
import React from 'react';

const RapperSelector = ({ rappers = [], onSelectionChange }) => {
  const [selected, setSelected] = useState([]);

  const toggleRapper = (nome) => {
    const isSelected = selected.includes(nome);
    const updated = isSelected
      ? selected.filter((r) => r !== nome)
      : [...selected, nome];

    setSelected(updated);
    onSelectionChange?.(updated); // notifica al genitore
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {rappers.map((rapper) => (
        <div
          key={rapper.nome}
          onClick={() => toggleRapper(rapper.nome)}
          className={`cursor-pointer p-4 rounded-lg border text-center font-semibold transition
            ${selected.includes(rapper.nome)
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