import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './MovieCard.css';

const MovieCard = ({ movie }) => {
  const [username, setUsername] = useState('');
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  return (
    <Link to={`/${username}/media/${movie.id}`} className="link-product-card">

      <div className="movie-card">
        <img className="movie-card-img" src={movie.img} alt={movie.title} />
        <div className="movie-card-content">
          <h3 className="movie-card-title">{movie.title}</h3>
          <p className="movie-card-desc">{movie.description}</p>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
