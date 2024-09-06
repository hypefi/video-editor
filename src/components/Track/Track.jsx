import React from 'react';

function Track({ type, clips, setTracks }) {
  const handleDrop = (e) => {
    e.preventDefault();
    const clipData = JSON.parse(e.dataTransfer.getData('text/plain'));
    setTracks((prevTracks) => ({
      ...prevTracks,
      [type]: [...prevTracks[type], clipData],
    }));
  };

  return (
    <div
      className={`track ${type}`}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <h3>{type}</h3>
      {clips.map((clip, index) => (
        <div key={index} className="clip">
          {clip.name}
        </div>
      ))}
    </div>
  );
}

export default Track;