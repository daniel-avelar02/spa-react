import React, { useState } from 'react';

const songs = [
  { title: '¿Por qué te conocí?', artist: 'Luis Miguel', src: '/music/porQueTeConoci.mp3' },
  { title: 'Tengo todo excepto a tí', artist: 'Luis Miguel', src: '/music/tengoTodoExceptoATi.mp3' },
  { title: 'Voy a apagar la luz', artist: 'Luis Miguel', src: '/music/voyAApagarLaLuzContigoAprendi.mp3' },
];

const Home = ({ playSong, currentSongIndex, isPlaying }) => {
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
                <button onClick={() => playSong(index)}>
                  <i className={currentSongIndex === index && isPlaying ? 'fas fa-pause' : 'fas fa-play'}></i>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;