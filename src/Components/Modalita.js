import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { getAllItems } from "../api";
import TournamentTabellone from "./TournamentTabellone";

const Modalita = ({ rounds, selectWinner }) => {
  const { murettoName } = useParams();
  const [rapper, setRapper] = useState([]);
  const [selectedMode, setSelectedMode] = useState("");
  const [selectedRappers, setSelectedRappers] = useState([]);
  const [tournamentRounds, setTournamentRounds] = useState([]);
  const [showTournament, setShowTournament] = useState(false);
  const [matchup, setMatchup] = useState(null);

  useEffect(() => {
    const fetchRappers = async () => {
      try {
        const response = await getAllItems();
        const muretto = response.find(item => item.alias === murettoName && item.tipo === 'Muretto');
        if (muretto && muretto.rapper) {
          setRapper(muretto.rapper);
        }
      } catch (error) {
        console.error("Errore nel recupero dei rapper", error);
      }
    };
    fetchRappers();
  }, [murettoName]);

  const toggleRapperSelection = (rapperName) => {
    setSelectedRappers(prevSelected =>
      prevSelected.includes(rapperName)
        ? prevSelected.filter(name => name !== rapperName)
        : [...prevSelected, rapperName]
    );
  };

  const generateMatchup = () => {
    if (selectedRappers.length < 2) {
      alert("Seleziona almeno due rapper per generare una sfida.");
      return;
    }

    let shuffled = [...selectedRappers].sort(() => Math.random() - 0.5);
    if (selectedMode === "1vs1") {
      setMatchup([shuffled[0], shuffled[1]]);
    } else if (selectedMode === "2vs2" && selectedRappers.length >= 4) {
      setMatchup([[shuffled[0], shuffled[1]], [shuffled[2], shuffled[3]]]);
    } else {
      alert("Seleziona almeno quattro rapper per un 2vs2.");
    }
  };

  const startTournament = () => {
    if (selectedRappers.length < 8 || selectedRappers.length > 32) {
      alert("Il torneo deve avere tra 8 e 32 partecipanti.");
      return;
    }
  
    let shuffledRappers = [...selectedRappers].sort(() => Math.random() - 0.5);
    let rounds = [];
    let currentRound = shuffledRappers.map(name => ({ team: name, winner: null }));

// Gestisci i numeri dispari
while (currentRound.length > 1) {
  let nextRound = [];
  for (let i = 0; i < currentRound.length; i += 2) {
    // Se c'è un team dispari, aggiungi un "BYE" (bye round)
    if (currentRound[i + 1]) {
      nextRound.push({ team1: currentRound[i], team2: currentRound[i + 1], winner: null });
    } else {
      nextRound.push({ team1: currentRound[i], team2: { team: "BYE" }, winner: currentRound[i].team });
    }
  }
  rounds.push(currentRound);  // Aggiungi il round attuale
  currentRound = nextRound;  // Passa al prossimo round
}

rounds.push(currentRound);  // Aggiungi l'ultimo round

    setTournamentRounds(rounds);
    setShowTournament(true);
  };

  const handleWinnerSelection = (roundIndex, matchIndex, winner) => {
    const newRounds = [...tournamentRounds];
    const match = newRounds[roundIndex][matchIndex];
  
    // Se il team 1 o team 2 è "BYE", il vincitore è già determinato
    if (match.team1.team === "BYE") {
      winner = match.team2.team;
    } else if (match.team2.team === "BYE") {
      winner = match.team1.team;
    }
  
    // Assegna il vincitore
    newRounds[roundIndex][matchIndex].winner = winner;
  
    // Passa il vincitore al round successivo
    if (roundIndex < newRounds.length - 1) {
      const nextMatchIndex = Math.floor(matchIndex / 2);
      newRounds[roundIndex + 1][nextMatchIndex] = {
        team1: newRounds[roundIndex][matchIndex].winner,
        team2: newRounds[roundIndex + 1][nextMatchIndex]?.team2 || null,
        winner: null
      };
    }
  
    setTournamentRounds(newRounds);
  };
  
  return (
    <div>
      <h2>Seleziona Modalità</h2>
      <select value={selectedMode} onChange={(e) => setSelectedMode(e.target.value)}>
        <option value="">Seleziona una modalità</option>
        <option value="1vs1">1 vs 1</option>
        <option value="2vs2">2 vs 2</option>
        <option value="torneo1vs1">Torneo 1 vs 1</option>
        <option value="torneo2vs2">Torneo 2 vs 2</option>
        <option value="lastManStanding1vs1">Last Man Standing 1 vs 1</option>
        <option value="lastManStanding2vs2">Last Man Standing 2 vs 2</option>
      </select>

      {!showTournament && (
        <>
          <h2>Seleziona i rapper presenti</h2>
          <table>
            <thead>
              <tr>
                <th>Seleziona</th>
                <th>Nome</th>
              </tr>
            </thead>
            <tbody>
              {rapper.map((rapperItem) => (
                <tr key={rapperItem.nome}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedRappers.includes(rapperItem.nome)}
                      onChange={() => toggleRapperSelection(rapperItem.nome)}
                    />
                  </td>
                  <td>{rapperItem.nome}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {["1vs1", "2vs2"].includes(selectedMode) && selectedRappers.length >= 2 && (
        <button onClick={generateMatchup}>
          Genera Sfida
        </button>
      )}

      {matchup && (
        <div>
          <h3>Risultato Sfida</h3>
          {selectedMode === "1vs1" ? (
            <p>{matchup[0]} 🆚 {matchup[1]}</p>
          ) : (
            <p>{matchup[0][0]} & {matchup[0][1]} 🆚 {matchup[1][0]} & {matchup[1][1]}</p>
          )}
        </div>
      )}

      {selectedMode.includes("torneo") && !showTournament && (
        <button onClick={startTournament} disabled={selectedRappers.length < 8 || selectedRappers.length > 32}>
          Inizia Torneo
        </button>
      )}

      {showTournament && (
        <div>
          <h2>Tabellone Torneo</h2>
          <TournamentTabellone rounds={tournamentRounds} selectWinner={handleWinnerSelection} />
        </div>
      )}
    </div>
  );
};

export default Modalita;
