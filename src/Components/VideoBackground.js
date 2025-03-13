import React from "react";
import "../videoBackground.css"; // Per gli stili

const VideoBackground = () => {
    return (
      <div className="video-container">
        <iframe
          src="https://www.youtube.com/embed/4lok5PBWpOk?autoplay=1&mute=1&loop=1&playlist=4lok5PBWpOk&controls=0&showinfo=0&modestbranding=1&rel=0"
          title="YouTube video background"
          frameBorder="0"
          allow="autoplay; fullscreen"
          allowFullScreen
          className="video-iframe"
        ></iframe>
        <div className="video-overlay"></div> {/* Per migliorare la leggibilità */}
      </div>
    );
  };
  
  export default VideoBackground;
