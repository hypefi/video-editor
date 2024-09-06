import React, { useState, useRef, useEffect } from 'react';
import './Clip.css';

function Clip({ clip, trackType, setTracks }) {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [originalStart, setOriginalStart] = useState(clip.start);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (clip.waveform && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      // Set canvas size
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Set line style
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 2;

      // Draw waveform
      ctx.beginPath();
      const sliceWidth = canvas.width / clip.waveform.length;
      let x = 0;

      for (let i = 0; i < clip.waveform.length; i++) {
        const y = (1 - clip.waveform[i]) * canvas.height / 2;
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
        x += sliceWidth;
      }

      ctx.stroke();
    }
  }, [clip]);

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
        {clip.type === 'video' && clip.thumbnail && (
          <div className="clip-thumbnail" style={{ backgroundImage: `url(${clip.thumbnail})` }}></div>
        )}
        {clip.type === 'video' && !clip.thumbnail && <div className="clip-video-icon"></div>}
        {(clip.type === 'music' || clip.type === 'narration') && clip.waveform && (
          <canvas ref={canvasRef} className="clip-waveform" />
        )}
        {(clip.type === 'music' || clip.type === 'narration') && !clip.waveform && <div className="clip-audio-icon"></div>}
        <span className="clip-name">{clip.name}</span>
      </div>
    </div>
  );
}

export default Clip;