import React, { useState } from 'react';
import Button from './Button';
const Youtube = ({ videoUrls }) => {
    const [currentVideo, setCurrentVideo] = useState(videoUrls[0]);
    const [playlist,setNewPlaylist] = useState('');
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
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 mt-4">
                    Playlist
                </label>
                <input
                    type="text"
                    name="nome"
                    value={playlist}
                    onChange={() => setNewPlaylist(event.target.value)}
                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                />
            </div>
            <div className="flex justify-center items-center">

            <Button label="Cambia playlist" onClick={()=> {setCurrentVideo(playlist.split("list=")[1])}} 
              className="mt-4 px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none" 
></Button>
</div>
        </div>
    );
};

export default Youtube;