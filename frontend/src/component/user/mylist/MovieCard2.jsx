import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './MovieCard2.css';

const MovieCard2 = ({ movie, handleDeleteMovie }) => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  return (
    <div className="movie-card2">
      <button className="delete-button" onClick={handleDeleteMovie}>X</button>
      <Link to={`/${username}/media/${movie.MEDIA_ID}`} className="link-product-card">
        <div className="movie-card2">
          <img className="movie-card2-img" src={movie.POSTER} alt={movie.TITLE} />
          <div className="movie-card2-content">
            <h3 className="movie-card2-title">{movie.TITLE}</h3>
            <p className="movie-card2-desc">{movie.DESCRIPTION}</p>
          </div>
        </div>
      </Link>
      
    </div>
  );
};

export default MovieCard2;
