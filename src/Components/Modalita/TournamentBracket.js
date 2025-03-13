import { Bracket, Seed, SeedItem, SeedTeam } from "react-brackets";

const TournamentBracket = ({ tournamentRounds, handleWinnerSelection }) => {
  return (
    <div className="bracket-container">
      <h2>Tabellone Torneo</h2>
      <Bracket
        rounds={tournamentRounds}
        renderSeedComponent={({ seed, roundIndex, seedIndex }) => (
          <Seed className="seed">
            <SeedItem className="seed-item">
              <div>
                {seed.teams.map((team, teamIndex) => (
                  <SeedTeam
                    key={teamIndex}
                    className="seed-team"
                    onClick={() => handleWinnerSelection(roundIndex, seedIndex, team.name)}
                  >
                    {team.name || "Attesa..."}
                  </SeedTeam>
                ))}
              </div>
            </SeedItem>
          </Seed>
        )}
      />
    </div>
  );
};

export default TournamentBracket;
