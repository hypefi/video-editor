import React, { useEffect, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';

const TrackWaveform = ({ audioUrl }) => {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);

  useEffect(() => {
    if (waveformRef.current && audioUrl) {
      const ws = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: '#A8DBA8',
        progressColor: '#3B8686',
        cursorColor: '#fff',
        barWidth: 2,
        barRadius: 3,
        cursorWidth: 1,
        height: 80,
        barGap: 3,
      });

      ws.load(audioUrl);
      wavesurfer.current = ws;

      return () => {
        if (wavesurfer.current) {
          wavesurfer.current.destroy();
        }
      };
    }
  }, [audioUrl]);

  return <div ref={waveformRef} />;
};

export default TrackWaveform;