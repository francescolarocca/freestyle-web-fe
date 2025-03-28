import React from "react";

const AddRapperForm = ({ rapperData, setRapperData, handleAddRapper, setSelectedFile, errorMessage }) => {

  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Ottiene il file selezionato
    if (file) {
      setRapperData(prevState => ({ ...prevState, avatar: file }));
      console.log("📌 File selezionato:", file.name);
    }
  };
  return (
    <div>
      <h3>Aggiungi un nuovo rapper</h3>
      <input
        type="text"
        placeholder="Nome rapper"
        value={rapperData.nome}
        onChange={(e) => setRapperData({ ...rapperData, nome: e.target.value })}
      />
      <input
        type="number"
        placeholder="Rank"
        value={rapperData.rank}
        onChange={(e) => setRapperData({ ...rapperData, rank: parseInt(e.target.value) })}
      />
      <textarea
        placeholder="Bio del rapper"
        value={rapperData.bio}
        onChange={(e) => setRapperData({ ...rapperData, bio: e.target.value })}
      />
      
      {/* Upload Avatar */}
      <input type="file" accept="image/*" onChange={handleFileChange} />
      
      <button onClick={handleAddRapper}>Aggiungi Rapper</button>
      
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
};

export default AddRapperForm;
