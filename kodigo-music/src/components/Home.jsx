import React, { useState, useRef, useEffect } from 'react';

const songs = [
  { title: '¿Por qué te conocí?', artist: 'Luis Miguel', src: '/music/porQueTeConoci.mp3' },
  { title: 'Tengo todo excepto a tí', artist: 'Luis Miguel', src: '/music/tengoTodoExceptoATi.mp3' },
  { title: 'Voy a apagar la luz', artist: 'Luis Miguel', src: '/music/voyAApagarLaLuzContigoAprendi.mp3' },
];

const Home = () => {
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
    setCurrentSongIndex(index);
    setIsPlaying(true);
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
    <div className="content">
      <div className="container">
        <h1>Bienvenido a Kodigo Music</h1>
        <p>Tu plataforma de música favorita. Especializada en música romántica y de despecho</p>
        <div>
          <h2>Lista de Canciones</h2>
          <ul>
            {songs.map((song, index) => (
              <li key={index}>
                {song.title} - {song.artist}
                <button onClick={() => playSong(index)}>Reproducir</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
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
    </div>
  );
};

export default Home;