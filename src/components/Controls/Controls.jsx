import React, { useRef } from 'react';
import './Controls.css';

function Controls({ setTracks }) {
  const videoInputRef = useRef(null);
  const musicInputRef = useRef(null);
  const narrationInputRef = useRef(null);

  const handleFileChange = (e, trackType) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const clipData = {
          type: trackType,
          name: file.name,
          src: event.target.result,
          start: 0,
          duration: 30, // Default duration, you may want to get the actual audio/video duration
        };
        setTracks((prevTracks) => ({
          ...prevTracks,
          [trackType]: [...prevTracks[trackType], clipData],
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="controls">
      <input
        type="file"
        accept="video/*"
        onChange={(e) => handleFileChange(e, 'video')}
        ref={videoInputRef}
        style={{ display: 'none' }}
      />
      <input
        type="file"
        accept="audio/*"
        onChange={(e) => handleFileChange(e, 'music')}
        ref={musicInputRef}
        style={{ display: 'none' }}
      />
      <input
        type="file"
        accept="audio/*"
        onChange={(e) => handleFileChange(e, 'narration')}
        ref={narrationInputRef}
        style={{ display: 'none' }}
      />
      <button onClick={() => videoInputRef.current.click()}>Add Video</button>
      <button onClick={() => musicInputRef.current.click()}>Add Music</button>
      <button>Add Captions</button>
      <button onClick={() => narrationInputRef.current.click()}>Add Narration</button>
    </div>
  );
}

export default Controls;