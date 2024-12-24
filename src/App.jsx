import React, { useState, useRef, useEffect } from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Form from './components/Form';
import Navbar from './components/Navbar';

const songs = [
  { title: '¿Por qué te conocí?', artist: 'Luis Miguel', src: `${process.env.PUBLIC_URL}/music/porQueTeConoci.mp3` },
  { title: 'Tengo todo excepto a tí', artist: 'Luis Miguel', src: `${process.env.PUBLIC_URL}/music/tengoTodoExceptoATi.mp3` },
  { title: 'Voy a apagar la luz', artist: 'Luis Miguel', src: `${process.env.PUBLIC_URL}/music/voyAApagarLaLuzContigoAprendi.mp3` },
];

function App() {
  const [currentSongIndex, setCurrentSongIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const playSong = (index) => {
    if (currentSongIndex === index) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    } else {
      setCurrentSongIndex(index);
      setIsPlaying(true);
    }
  };

  const playNextSong = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
  };

  const playPrevSong = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex - 1 + songs.length) % songs.length);
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };

  const handleTimeChange = (e) => {
    const newTime = e.target.value;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const playRandomSong = () => {
    const randomIndex = Math.floor(Math.random() * songs.length);
    setCurrentSongIndex(randomIndex);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home playSong={playSong} currentSongIndex={currentSongIndex} isPlaying={isPlaying} />} />
        <Route path="/about" element={<About />} />
        <Route path="/form" element={<Form />} />
      </Routes>
      {currentSongIndex !== null && (
        <div className="player">
          <audio
            ref={audioRef}
            src={songs[currentSongIndex].src}
            onEnded={playNextSong}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            autoPlay
          />
          <div className="player-content">
            <div className="player-info">
              <h3>{songs[currentSongIndex].title}</h3>
              <p>{songs[currentSongIndex].artist}</p>
            </div>
            <div className="player-controls">
              <button onClick={playPrevSong}><i className="fas fa-backward"></i></button>
              <button onClick={togglePlayPause}>
                <i className={isPlaying ? 'fas fa-pause' : 'fas fa-play'}></i>
              </button>
              <button onClick={playNextSong}><i className="fas fa-forward"></i></button>
            </div>
            <div className="volume-controls">
              <i className="fas fa-volume-up"></i>
              <input type="range" min="0" max="1" step="0.01" value={volume} onChange={handleVolumeChange} />
            </div>
          </div>
          <input
            type="range"
            className="progress-bar"
            min="0"
            max={duration}
            step="0.01"
            value={currentTime}
            onChange={handleTimeChange}
          />
        </div>
      )}
    </Router>
  );
}

export default App;