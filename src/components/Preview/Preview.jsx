import React, { useRef, useEffect, useState } from 'react';
import './Preview.css';

function Preview({ tracks }) {
  const videoRef = useRef(null);
  const [currentVideo, setCurrentVideo] = useState(null);

  useEffect(() => {
    const videoTrack = tracks.video[0];
    if (videoTrack && videoTrack.src !== currentVideo) {
      setCurrentVideo(videoTrack.src);
    }
  }, [tracks, currentVideo]);

  return (
    <div className="preview">
      {currentVideo ? (
        <video ref={videoRef} src={currentVideo} controls>
          Your browser does not support the video tag.
        </video>
      ) : (
        <div className="placeholder">No video selected</div>
      )}
    </div>
  );
}

export default Preview;