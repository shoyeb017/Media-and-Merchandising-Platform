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
      <Link to={`/${username}/media/${movie.id}`} className="link-product-card">
        <div className="movie-card2">
          <img className="movie-card2-img" src={movie.img} alt={movie.title} />
          <div className="movie-card2-content">
            <h3 className="movie-card2-title">{movie.title}</h3>
            <p className="movie-card2-desc">{movie.description}</p>
          </div>
        </div>
      </Link>
      
    </div>
  );
};

export default MovieCard2;
