import React, { useState } from 'react';

const Youtube = ({ videoUrls }) => {
    const [currentVideo, setCurrentVideo] = useState(videoUrls[0]);
    
    const changeVideo = () => {
        const randomIndex = Math.floor(Math.random() * videoUrls.length);
        setCurrentVideo(videoUrls[randomIndex]);
    };

    return (
        <div>
            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
                <iframe
                    src={`https://www.youtube.com/embed/videoseries?list=${currentVideo}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                    }}
                ></iframe>
            </div>
            <button onClick={changeVideo} style={{ marginTop: '10px' }}>
                Cambia Video
            </button>
        </div>
    );
};

export default Youtube;