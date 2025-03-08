import React, { useState } from 'react';
import AddPresenzaForm from "./AddPresenzaForm";
import { getAllItems } from "../api";




const MurettoTable = ({ muretti, onPresenzaAdded }) => {
    const [selectedRapper, setSelectedRapper] = useState(null);

    const handlePresenzaAdded = async () => {
        try {
          const data = await getAllItems();
          setSelectedRapper(data);
        } catch (error) {
          console.error("Errore nel ricaricare i dati", error);
        }
      };
  
    return (
        <div>
          <h2>Lista Muretti</h2>
          <table border="1">
            <thead>
              <tr>
                <th>Nome Muretto</th>
                <th>Alias</th>
                <th>Rapper</th>
                <th>Presenze</th>
                <th>Azioni</th>
              </tr>
            </thead>
            <tbody>
              {muretti.map((muretto) => (
                <tr key={muretto.id}>
                  <td>{muretto.valore}</td>
                  <td>{muretto.alias}</td>
                  <td>
                    {muretto.rapper.length > 0 ? (
                      <ul>
                        {muretto.rapper.map((rapper) => (
                          <li key={rapper.nome}>
                            {rapper.nome} - Rank: {rapper.rank}
                            <button onClick={() => setSelectedRapper({ muretto: muretto.valore, ...rapper })}>
                              Aggiungi Presenza
                            </button>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      "Nessun rapper"
                    )}
                  </td>
                  <td>
                    {muretto.rapper.length > 0 ? (
                      muretto.rapper.map((rapper) => (
                        <div key={rapper.nome}>
                          <strong>{rapper.nome}:</strong>
                          {rapper.presenze.length > 0 ? (
                            <ul>
                              {rapper.presenze.map((presenza, index) => (
                                <li key={index}>
                                  {new Date(presenza.data).toLocaleDateString()} - {presenza.evento} - Punteggio: {presenza.punteggio}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p>Nessuna presenza registrata</p>
                          )}
                        </div>
                      ))
                    ) : (
                      "Nessuna presenza registrata"
                    )}
                  </td>
                  <td></td>
                </tr>
              ))}
            </tbody>
          </table>
    
          {/* Form per aggiungere presenze */}
          {selectedRapper && (
            <AddPresenzaForm rapper={selectedRapper} onPresenzaAdded={onPresenzaAdded} />
          )}
        </div>
      );
    };
  

export default MurettoTable;
