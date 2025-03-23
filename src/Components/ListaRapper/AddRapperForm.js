import React from "react";

const AddRapperForm = ({ rapperData, setRapperData, handleAddRapper, errorMessage }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRapperData({ ...rapperData, [name]: value });
  };

  return (
    <div>
      <h3 className="subtitle">Aggiungi un nuovo rapper</h3>

      <input 
        type="text" 
        className="input-field"
        name="nome"
        value={rapperData.nome} 
        onChange={handleChange} 
        placeholder="Nome del rapper" 
      />

      <input
        type="number"
        className="input-field"
        name="rank"
        value={rapperData.rank}
        onChange={handleChange}
        placeholder="Rank"
      />

      <input
        type="text"
        className="input-field"
        name="bio"
        value={rapperData.bio}
        onChange={handleChange}
        placeholder="Bio"
      />

      <input
        type="text"
        className="input-field"
        name="avatarUrl"
        value={rapperData.avatarUrl}
        onChange={handleChange}
        placeholder="Avatar URL"
      />

      <input
        type="text"
        className="input-field"
        name="spotifyLink"
        value={rapperData.spotifyLink}
        onChange={handleChange}
        placeholder="Spotify Link"
      />

      <input
        type="text"
        className="input-field"
        name="soundcloudLink"
        value={rapperData.soundcloudLink}
        onChange={handleChange}
        placeholder="SoundCloud Link"
      />

      <input
        type="text"
        className="input-field"
        name="instagramLink"
        value={rapperData.instagramLink}
        onChange={handleChange}
        placeholder="Instagram Link"
      />

      <button className="btn btn-add" onClick={handleAddRapper}>Aggiungi</button>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default AddRapperForm;
