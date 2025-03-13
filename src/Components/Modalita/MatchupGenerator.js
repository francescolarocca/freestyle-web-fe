const MatchupGenerator = ({ selectedMode, selectedRappers, matchup, generateMatchup }) => {
    return (
      <>
        {["1vs1", "2vs2"].includes(selectedMode) && selectedRappers.length >= 2 && (
          <button onClick={generateMatchup}>Genera Sfida</button>
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
      </>
    );
  };

  export default MatchupGenerator;

  