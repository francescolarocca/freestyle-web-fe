import React from 'react';

function ModalitaCard() {
  const modalita = [
    { id: 1, name: "Freestyle Battle", description: "1vs1 battaglia freestyle" },
    { id: 2, name: "Cypher", description: "Sessione di gruppo" },
    { id: 3, name: "Time Attack", description: "60 secondi di fuoco" },
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Modalità</h2>
      
      <div className="space-y-4">
        {modalita.map((mode) => (
          <div 
            key={mode.id}
            className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50"
          >
            <h3 className="font-semibold">{mode.name}</h3>
            <p className="text-gray-600 text-sm">{mode.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ModalitaCard;