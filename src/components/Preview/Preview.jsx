import React, { useRef, useEffect } from 'react';
import './Preview.css';

function Preview({ tracks }) {
  const videoRef = useRef(null);

  useEffect(() => {
    // Here you would implement the logic to combine all tracks
    // and update the video source
    // For now, we'll just use the first video track if available
    const videoTrack = tracks.video[0];
    if (videoTrack && videoRef.current) {
      videoRef.current.src = videoTrack.src;
    }
  }, [tracks]);

  return (
    <div className="preview">
      <video ref={videoRef} controls>
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export default Preview;