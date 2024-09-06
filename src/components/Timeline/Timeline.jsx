import React, { useState, useRef, useEffect } from 'react';
import Track from '../Track/Track';
import './Timeline.css';

function Timeline({ tracks, setTracks }) {
  const [duration, setDuration] = useState(300); // Default 5 minutes in seconds
  const timelineRef = useRef(null);

  useEffect(() => {
    const maxDuration = Object.values(tracks).reduce((max, trackClips) => {
      const trackDuration = trackClips.reduce((sum, clip) => Math.max(sum, clip.start + clip.duration), 0);
      return Math.max(max, trackDuration);
    }, 0);
    setDuration(Math.max(300, Math.ceil(maxDuration / 30) * 30)); // Round up to nearest 30 seconds
  }, [tracks]);

  const renderTimeRuler = () => {
    const markers = [];
    for (let i = 0; i <= duration; i += 30) {
      markers.push(
        <div key={i} className="time-marker" style={{ left: `${i * 10}px` }}>
          {formatTime(i)}
        </div>
      );
    }
    return markers;
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleScroll = (e) => {
    const ruler = document.querySelector('.time-ruler');
    ruler.style.transform = `translateX(-${e.target.scrollLeft}px)`;
  };

  return (
    <div className="timeline-container">
      <div className="time-ruler">{renderTimeRuler()}</div>
      <div className="timeline" ref={timelineRef} onScroll={handleScroll}>
        {Object.entries(tracks).map(([trackType, clips]) => (
          <Track
            key={trackType}
            type={trackType}
            clips={clips}
            setTracks={setTracks}
            duration={duration}
          />
        ))}
      </div>
    </div>
  );
}

export default Timeline;