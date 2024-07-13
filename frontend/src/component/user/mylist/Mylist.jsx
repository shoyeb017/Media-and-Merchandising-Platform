import React, { useState } from 'react';
import MovieCard2 from './MovieCard2';
import './Mylist.css';

const Mylist = ({ planToWatchMovies, watchedMovies, setPlanToWatchMovies, setWatchedMovies }) => {
  const [activeList, setActiveList] = useState('planToWatch');

  const handleButtonClick = (list) => {
    setActiveList(list);
  };

  const handleDeleteMovie = (id, list) => {
    if (list === 'planToWatch') {
      setPlanToWatchMovies(planToWatchMovies.filter(movie => movie.id !== id));
    } else {
      setWatchedMovies(watchedMovies.filter(movie => movie.id !== id));
    }
  };

  return (
    <div className="my-list-container">
      <div className="button-container">
        <button
          className={`list-button ${activeList === 'planToWatch' ? 'active' : ''}`}
          onClick={() => handleButtonClick('planToWatch')}
        >
          Plan to Watch
        </button>
        <button
          className={`list-button ${activeList === 'watched' ? 'active' : ''}`}
          onClick={() => handleButtonClick('watched')}
        >
          Watched
        </button>
      </div>
      <div className="movie-list">
        {activeList === 'planToWatch' && planToWatchMovies.map((movie) => (
          <MovieCard2 key={movie.id} movie={movie} handleDeleteMovie={() => handleDeleteMovie(movie.id, 'planToWatch')} />
        ))}
        {activeList === 'watched' && watchedMovies.map((movie) => (
          <MovieCard2 key={movie.id} movie={movie} handleDeleteMovie={() => handleDeleteMovie(movie.id, 'watched')} />
        ))}
      </div>
    </div>
  );
};

export default Mylist;
