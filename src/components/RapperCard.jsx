import React from 'react';

function RapperCard({rappers}) {


  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Rappers</h2>
      
      <div className="space-y-4">
        {rappers.map((rapper) => (
          <div 
            key={rapper.nome}
            className="p-4 border rounded-lg"
          >
            <h3 className="font-semibold">{rapper.nome}</h3>
            <p className="text-gray-600 text-sm">Bio: {rapper.bio}</p>
            <p className="text-gray-600 text-sm">Instagram: {rapper.instagramLink}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RapperCard;