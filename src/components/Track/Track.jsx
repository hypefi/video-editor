import React from 'react';
import Clip from '../Clip/Clip';
import './Track.css';
import TrackWaveform from '../Trackwaveform/TrackWaveForm';

function Track({ type, clips, setTracks, duration }) {
  const handleDrop = (e) => {
    e.preventDefault();
    const clipData = JSON.parse(e.dataTransfer.getData('text/plain'));
    const trackRect = e.currentTarget.getBoundingClientRect();
    const dropPosition = (e.clientX - trackRect.left) / 10; // 10px per second

    setTracks((prevTracks) => ({
      ...prevTracks,
      [type]: [...prevTracks[type], { ...clipData, start: dropPosition }],
    }));
  };

  return (
    <div
      className={`track ${type}`}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      style={{ width: `${duration * 10}px` }}
    >
      <div className="track-label">{type}</div>
      <div className="track-content">
        {type === 'music' && clips.length > 0 && (
          <TrackWaveform audioUrl={clips[0].src} />
        )}
        {clips.map((clip, index) => (
          <Clip key={index} clip={clip} trackType={type} setTracks={setTracks} />
        ))}
      </div>
    </div>
  );
}

export default Track;