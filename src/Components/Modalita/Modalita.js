import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { getAllItems } from "../../api";
import ModeSelector from "./ModeSelector";
import RapperSelection from "../Modalita/RapperSelection";
import MatchupGenerator from "../Modalita/MatchupGenerator";
import TournamentBracket from "../Modalita/TournamentBracket";
import "../../modalita.css";

const Modalita = () => {
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
    let currentRound = shuffledRappers.map(name => ({ name }));

    while (currentRound.length > 1) {
      let nextRound = [];
      let seeds = [];

      for (let i = 0; i < currentRound.length; i += 2) {
        seeds.push({
          id: i / 2 + 1,
          teams: [currentRound[i], currentRound[i + 1]],
        });
        nextRound.push({ name: null });
      }

      rounds.push({ title: `Round ${rounds.length + 1}`, seeds });
      currentRound = nextRound;
    }
    

    setTournamentRounds(rounds);
    setShowTournament(true);
  };
  const handleWinnerSelection = (roundIndex, seedIndex, winner) => {
    const newRounds = [...tournamentRounds];
  
    // Imposta il vincitore nel round attuale
    newRounds[roundIndex].seeds[seedIndex].winner = winner;
  
    // Passa il vincitore al round successivo (se esiste)
    if (roundIndex < newRounds.length - 1) {
      const nextMatchIndex = Math.floor(seedIndex / 2);
      newRounds[roundIndex + 1].seeds[nextMatchIndex].teams[seedIndex % 2] = { name: winner };
    }
  
    setTournamentRounds(newRounds);
  };

  return (
    <div>
      <ModeSelector selectedMode={selectedMode} setSelectedMode={setSelectedMode} />
      {!showTournament && <RapperSelection rapper={rapper} selectedRappers={selectedRappers} toggleRapperSelection={toggleRapperSelection} />}
      <MatchupGenerator selectedMode={selectedMode} selectedRappers={selectedRappers} matchup={matchup} generateMatchup={generateMatchup} />
      {selectedMode.includes("torneo") && !showTournament && (
        <button onClick={startTournament} disabled={selectedRappers.length < 8 || selectedRappers.length > 32}>
          Inizia Torneo
        </button>
      )}
      {showTournament && <TournamentBracket tournamentRounds={tournamentRounds} handleWinnerSelection={handleWinnerSelection} />}
    </div>
  );
};

export default Modalita;