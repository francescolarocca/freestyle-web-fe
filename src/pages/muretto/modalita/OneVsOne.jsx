import React, { useState, setError } from 'react';
import { useOutletContext } from 'react-router-dom';
function OneVsOne() {
  const { selectedRappers } = useOutletContext();
  const [error, setError] = useState("");
  const [sfida, setSfida] = useState("");

  const generaSfida = () => {
    if (selectedRappers.length < 3) {
      setError("Seleziona almeno 3 rapper per generare la sfida.");
      setSfida("");
      return;
    }
    setError("");
    let firstRandomRapperIndex = "";
    let secondRandomRapperIndex = "";

    while (firstRandomRapperIndex === secondRandomRapperIndex) {
      firstRandomRapperIndex = Math.floor(Math.random() * selectedRappers.length);
      secondRandomRapperIndex = Math.floor(Math.random() * selectedRappers.length);
    }

    setSfida(selectedRappers[firstRandomRapperIndex] + "/" + selectedRappers[secondRandomRapperIndex]);

  }
  return (
    <>
      
      <div className="mt-4">
        {error && (
          <div className="mt-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg text-sm flex items-center gap-2">
            <svg
              className="w-5 h-5 text-red-600 shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-.01-8a9 9 0 100 18 9 9 0 000-18z" />
            </svg>
            <span>{error}</span>
          </div>)}

        {sfida && (
          <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md mx-auto">
          <div className="flex items-center justify-between gap-4">
            {/* Rapper 1 */}
            <div className="flex-1 bg-blue-100 border border-blue-300 rounded-xl shadow-md h-[60px] flex items-center justify-center text-center px-4">
              <h2 className="text-base font-semibold text-blue-800 break-words">{sfida.split("/")[0]}</h2>
            </div>
        
            {/* VS */}
            <div className="text-xl font-bold text-gray-700 mx-2 shrink-0">VS</div>
        
            {/* Rapper 2 */}
            <div className="flex-1 bg-blue-100 border border-blue-300 rounded-xl shadow-md h-[60px] flex items-center justify-center text-center px-4">
              <h2 className="text-base font-semibold text-blue-800 break-words">{sfida.split("/")[1]}</h2>
            </div>
          </div>
        </div>
        )}
<div className="flex justify-center mt-8">
        <button
          className="bg-blue-500 text-white rounded px-4 py-2 text-lg hover:bg-blue-600 focus:outline-none"
          onClick={generaSfida}
        >
          Genera sfida

        </button>
      </div>
      </div>
    </>
  );
}

export default OneVsOne;