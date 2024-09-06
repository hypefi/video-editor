import React, { useRef } from 'react';
import './Controls.css';

function Controls({ setTracks }) {
  const videoInputRef = useRef(null);
  const musicInputRef = useRef(null);
  const narrationInputRef = useRef(null);

  const getMediaDuration = (file) => {
    return new Promise((resolve) => {
      const element = file.type.startsWith('video') ? document.createElement('video') : document.createElement('audio');
      element.preload = 'metadata';
      element.onloadedmetadata = () => resolve(element.duration);
      element.src = URL.createObjectURL(file);
    });
  };

  const generateThumbnail = (file) => {
    return new Promise((resolve) => {
      const video = document.createElement('video');
      video.preload = 'metadata';
      video.onloadeddata = () => {
        video.currentTime = 1; // Seek to 1 second
      };
      video.onseeked = () => {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL());
      };
      video.src = URL.createObjectURL(file);
    });
  };

  const generateWaveform = async (file) => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const reader = new FileReader();
    
    return new Promise((resolve) => {
      reader.onload = async (e) => {
        const audioBuffer = await audioContext.decodeAudioData(e.target.result);
        const channelData = audioBuffer.getChannelData(0);
        const samples = 100; // Number of samples for the waveform
        const blockSize = Math.floor(channelData.length / samples);
        const waveform = [];

        for (let i = 0; i < samples; i++) {
          const start = i * blockSize;
          let sum = 0;
          for (let j = 0; j < blockSize; j++) {
            sum += Math.abs(channelData[start + j]);
          }
          waveform.push(sum / blockSize);
        }

        // Normalize waveform
        const multiplier = Math.pow(Math.max(...waveform), -1);
        const normalizedWaveform = waveform.map(n => n * multiplier);
        
        resolve(normalizedWaveform);
      };
      reader.readAsArrayBuffer(file);
    });
  };

  const handleFileChange = async (e, trackType) => {
    const file = e.target.files[0];
    if (file) {
      const duration = await getMediaDuration(file);
      let thumbnail = null;
      let waveform = null;

      if (file.type.startsWith('video')) {
        thumbnail = await generateThumbnail(file);
      } else if (file.type.startsWith('audio')) {
        waveform = await generateWaveform(file);
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const clipData = {
          type: trackType,
          name: file.name,
          src: event.target.result,
          start: 0,
          duration: duration,
          thumbnail: thumbnail,
          waveform: waveform,
        };
        setTracks((prevTracks) => ({
          ...prevTracks,
          [trackType]: [...prevTracks[trackType], clipData],
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="controls">
      <input
        type="file"
        accept="video/*"
        onChange={(e) => handleFileChange(e, 'video')}
        ref={videoInputRef}
        style={{ display: 'none' }}
      />
      <input
        type="file"
        accept="audio/*"
        onChange={(e) => handleFileChange(e, 'music')}
        ref={musicInputRef}
        style={{ display: 'none' }}
      />
      <input
        type="file"
        accept="audio/*"
        onChange={(e) => handleFileChange(e, 'narration')}
        ref={narrationInputRef}
        style={{ display: 'none' }}
      />
      <button onClick={() => videoInputRef.current.click()}>Add Video</button>
      <button onClick={() => musicInputRef.current.click()}>Add Music</button>
      <button>Add Captions</button>
      <button onClick={() => narrationInputRef.current.click()}>Add Narration</button>
    </div>
  );
}

export default Controls;