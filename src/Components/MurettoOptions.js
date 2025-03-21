import React from 'react';
import { useParams, Link } from 'react-router-dom';
import "../murettoOptions.css";
import { motion } from "motion/react"

const MurettoOptions = () => {
  const { murettoId } = useParams(); // Otteniamo il parametro dalla URL

  return (
    <>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>

    {/* Overlay scuro per leggibilità */}
    <div className="overlay"></div>

    {/* Header fisso con il titolo */}
    <div className="header">
      <h2 className="muretto-title">{murettoId}</h2>
    </div>

    {/* Contenuto principale con le card */}
    <motion.div  className="options-container">
      <div className="options-grid">
        {/* Card per il ranking */}
        <Link to={`/muretto/${murettoId}/ranking`} className="option-card">
          RANKING
        </Link>

        {/* Card per la lista dei rapper */}
        <Link to={`/muretto/${murettoId}/rapper`} className="option-card">
          RAPPER
        </Link>

        {/* Card per la lista modalità */}
        <Link to={`/muretto/${murettoId}/modalita`} className="option-card">
          MODALITA
        </Link>
      </div>
    </motion.div>
  </>
  );
};

export default MurettoOptions;
