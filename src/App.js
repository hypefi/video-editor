import React, { useState } from 'react';
import Timeline from './components/Timeline/Timeline';
import Controls from './components/Controls/Controls';
import './App.css';

function App() {
  const [tracks, setTracks] = useState({
    video: [],
    music: [],
    captions: [],
    narration: [],
  });

  return (
    <div className="App">
      <h1>Simple Video Editor</h1>
      <Controls setTracks={setTracks} />
      <Timeline tracks={tracks} setTracks={setTracks} />
    </div>
  );
}

export default App;