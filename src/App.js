import React, { useState } from 'react';
import Timeline from './components/Timeline/Timeline';
import Controls from './components/Controls/Controls';
import Preview from './components/Preview/Preview';
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
      <div className="editor-layout">
        <Preview tracks={tracks} />
        <div className="editor-controls">
          <Controls setTracks={setTracks} />
          <Timeline tracks={tracks} setTracks={setTracks} />
        </div>
      </div>
    </div>
  );
}

export default App;