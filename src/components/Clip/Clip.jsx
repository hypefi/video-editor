import React, { useState } from 'react';
import './Clip.css';

function Clip({ clip, trackType, setTracks }) {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [originalStart, setOriginalStart] = useState(clip.start);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setOriginalStart(clip.start);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const deltaX = e.clientX - startX;
    const newStart = Math.max(0, originalStart + deltaX / 10);

    setTracks((prevTracks) => ({
      ...prevTracks,
      [trackType]: prevTracks[trackType].map((c) =>
        c === clip ? { ...c, start: newStart } : c
      ),
    }));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      className={`clip ${clip.type}`}
      style={{
        left: `${clip.start * 10}px`,
        width: `${clip.duration * 10}px`,
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div className="clip-content">
        {clip.type === 'video' && <div className="clip-video-icon"></div>}
        {(clip.type === 'music' || clip.type === 'narration') && <div className="clip-audio-icon"></div>}
        <span className="clip-name">{clip.name}</span>
      </div>
    </div>
  );
}

export default Clip;