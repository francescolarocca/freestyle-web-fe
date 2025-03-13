const ModeSelector = ({ selectedMode, setSelectedMode }) => {
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
      </div>
    );
  };

  export default ModeSelector;

  