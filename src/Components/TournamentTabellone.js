import React from 'react';
import '../tabellone.css'; // Assicurati di aggiungere il file CSS

const TournamentTabellone = ({ rounds, selectWinner }) => {
    const renderMatchup = (match, roundIndex, matchIndex) => {
        if (match.team1 && match.team2) { // Verifica che entrambi i team siano definiti
          return (
            <div className="match">
              <div>{match.team1.team}</div>
              <div>vs</div>
              <div>{match.team2.team}</div>
              <button onClick={() => selectWinner(roundIndex, matchIndex, match.team1.team)}>Vincitore: {match.team1.team}</button>
              <button onClick={() => selectWinner(roundIndex, matchIndex, match.team2.team)}>Vincitore: {match.team2.team}</button>
            </div>
          );
        }
        return <div>{match.team1 ? match.team1.team : "Nessuna partita"}</div>;
      }};
  
  export default TournamentTabellone;