import React, { useRef } from 'react';
import './Controls.css';

function Controls({ setTracks }) {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const clipData = {
          type: 'video',
          name: file.name,
          src: event.target.result,
          start: 0,
          duration: 30, // Default duration, you may want to get the actual video duration
        };
        setTracks((prevTracks) => ({
          ...prevTracks,
          video: [...prevTracks.video, clipData],
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
        onChange={handleFileChange}
        ref={fileInputRef}
        style={{ display: 'none' }}
      />
      <button onClick={() => fileInputRef.current.click()}>Add Video</button>
      <button>Add Music</button>
      <button>Add Captions</button>
      <button>Add Narration</button>
    </div>
  );
}

export default Controls;