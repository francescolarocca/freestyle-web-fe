import React, { useState, setError } from 'react';
import { useOutletContext } from 'react-router-dom';
import { shuffleArray } from '../../../services/arrayUtils';
function TwoVsTwo() {
  const { selectedRappers } = useOutletContext();
  const [error, setError] = useState("");
  const [sfida, setSfida] = useState([]);
  const [spariggio, setSpariggio] = useState({});
  const [squadre, setSquadre] = useState([]);

  const creaSquadre = () => {
    if (selectedRappers.length < 4) {
      setError("Seleziona almeno 4 rapper per generare la sfida.");
      return;
    }
    setError("")
    let shuffle = shuffleArray(selectedRappers);
    console.log(shuffle);
    let nuoveSquadre = [];
    for (let i = 0; shuffle.length > i; i = i + 2) {

      if (shuffle.length < i + 2) {
        setSpariggio(shuffle[i]);
      } else {
        console.log('squadra', shuffle[i], shuffle[i + 1]);
        nuoveSquadre.push([shuffle[i], shuffle[i + 1]]);
      }

      console.log('nuove squadre', nuoveSquadre);
    }
    setSquadre(nuoveSquadre)

  }

  const generaSfida = () => {
    if (selectedRappers.length < 5) {
      setError("Seleziona almeno 5 rapper per generare la sfida.");
      setSfida("");
      return;
    }
    setError("");
    let x = selectedRappers.length;
    let alreadySelectedRappers = [];
    while (alreadySelectedRappers.length < 4) {
      console.log('sfida:', sfida);
      console.log('x:', x);
      let firstRandomRapperIndex = 0;
      let secondRandomRapperIndex = 0;

      while (firstRandomRapperIndex === secondRandomRapperIndex) {
        firstRandomRapperIndex = Math.floor(Math.random() * x);
        secondRandomRapperIndex = Math.floor(Math.random() * x);
        console.log('generate index random: first {} second{}', firstRandomRapperIndex, secondRandomRapperIndex);
        // Se il rapper è già stato selezionato, genera un nuovo indice
        if (alreadySelectedRappers.includes(firstRandomRapperIndex) || alreadySelectedRappers.includes(secondRandomRapperIndex)) {
          console.log('alreadySelectedRappers', alreadySelectedRappers);
          firstRandomRapperIndex = 0;
          secondRandomRapperIndex = 0;
          console.log('alreadySelectedRappers contains ', firstRandomRapperIndex, secondRandomRapperIndex);

        }
      }
      alreadySelectedRappers.push(firstRandomRapperIndex);
      alreadySelectedRappers.push(secondRandomRapperIndex);
      console.log('alreadySelectedRappers', alreadySelectedRappers);

    }
    setSfida([
      selectedRappers[alreadySelectedRappers[0]],
      selectedRappers[alreadySelectedRappers[1]],
      selectedRappers[alreadySelectedRappers[2]],
      selectedRappers[alreadySelectedRappers[3]]
    ]);
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

        {squadre &&
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
             {squadre.map((squadra, index) => {
              return (
                <React.Fragment key={index}>
                  <div className="bg-white rounded-2xl shadow-lg p-4 flex flex-col items-center space-y-2">
                    <h3 className="text-lg font-bold">Squadra {index + 1}</h3>
                    <div className="flex flex-col items-center space-y-1">
                      <span className="text-base"> {squadra[0]}</span>
                      <span className="text-base"> {squadra[1]}</span>
                    </div>
                  </div>
                </React.Fragment>
              )
            })}
          </div>
        }




        {sfida.length >= 4 && (
          <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md mx-auto">
            <div className="flex flex-col items-center justify-center gap-6">
              {/* Primo team */}
              <div className="w-full bg-blue-100 border border-blue-300 rounded-xl shadow-md h-[60px] flex items-center justify-center text-center px-4">
                <h2 className="text-base font-semibold text-blue-800 overflow-hidden text-ellipsis whitespace-nowrap">{sfida[0]}🤝🏻{sfida[1]}</h2>
              </div>

              {/* VS */}
              <div className="text-xl font-bold text-gray-700">VS</div>

              {/* Secondo team */}
              <div className="w-full bg-blue-100 border border-blue-300 rounded-xl shadow-md h-[60px] flex items-center justify-center text-center px-4">
                <h2 className="text-base font-semibold text-blue-800 overflow-hidden text-ellipsis whitespace-nowrap">{sfida[2]}🤝🏻{sfida[3]}</h2>
              </div>
            </div>
          </div>
        )}

        


        <div className="flex justify-center mt-8">
          <button
            className="bg-blue-500 text-white rounded px-4 py-2 text-lg hover:bg-blue-600 focus:outline-none mr-4"
            onClick={generaSfida}
          >
            Genera sfida singola

          </button>
          <button
            className="bg-blue-500 text-white rounded px-4 py-2 text-lg hover:bg-blue-600 focus:outline-none"
            onClick={creaSquadre}
          >
            Crea squadre

          </button>
        </div>
      </div>
    </>
  );
}

export default TwoVsTwo;