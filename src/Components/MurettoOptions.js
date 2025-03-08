import React from 'react';
import { useParams, Link } from 'react-router-dom';
import "../murettoOptions.css";

const MurettoOptions = () => {
  const { murettoId } = useParams(); // Otteniamo il parametro dalla URL

  return (
    <>
    {/* Video di background */}
    <video className="video-bg" autoPlay loop muted>
      <source src="https://drive.google.com/uc?export=download&id=1sYrIb3fOqiJSHWzxPc15hC_Byn3ZV628" type="video/mp4" />
    </video>

    {/* Overlay scuro per leggibilità */}
    <div className="overlay"></div>

    {/* Header fisso con il titolo */}
    <div className="header">
      <h2 className="muretto-title">{murettoId}</h2>
    </div>

    {/* Contenuto principale con le card */}
    <div className="options-container">
      <div className="options-grid">
        {/* Card per il ranking */}
        <Link to={`/muretto/${murettoId}/ranking`} className="option-card">
          RANKING
        </Link>

        {/* Card per la lista dei rapper */}
        <Link to={`/muretto/${murettoId}/rapper`} className="option-card">
          RAPPER
        </Link>

        {/* Card per la lista dei rapper */}
        <Link to={`/muretto/${murettoId}/modalita`} className="option-card">
          MODALITA
        </Link>
      </div>
    </div>
  </>
  );
};

export default MurettoOptions;
