import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAllItems } from '../../api';
import '../../profile.css';

const RapperProfile = () => {
  const { nomeRapper } = useParams();
  
  const [rapperData, setRapperData] = useState(null);

  useEffect(() => {
    const fetchRapper = async () => {
      const response = await getAllItems();
      let found = null;
      response.forEach(item => {
        if (item.tipo === "Muretto") {
          const r = item.rapper.find(r => r.nome === nomeRapper);
          if (r) found = { ...r, muretto: item.alias };
        }
      });
      setRapperData(found);
    };

    fetchRapper();
  }, [nomeRapper]);

  if (!rapperData) return <div>Loading...</div>;

  return (
    <div className="rapper-profile">
      <h2>{rapperData.nome}</h2>
      <img src={rapperData.avatarUrl} alt="Avatar" className="avatar" />
      <p>{rapperData.bio}</p>
      <p>Rank: {rapperData.rank}</p>
      <p>Presenze: {rapperData.presenze.length}</p>
      <div className="links">
        {rapperData.spotifyLink && <a href={rapperData.spotifyLink}>Spotify</a>}
        {rapperData.soundcloudLink && <a href={rapperData.soundcloudLink}>Soundcloud</a>}
        {rapperData.instagramLink && <a href={rapperData.instagramLink}>Instagram</a>}
      </div>
    </div>
  );
};

export default RapperProfile;
