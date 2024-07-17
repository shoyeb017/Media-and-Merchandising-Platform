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
    <Link to={`/company/${username}/media/${movie.id}`} className="link-product-card">

      <div className="company-movie-card">
        <img className="company-movie-card-img" src={movie.img} alt={movie.title} />
        <div className="company-movie-card-content">
          <h3 className="company-movie-card-title">{movie.title}</h3>
          <p className="company-movie-card-desc">{movie.description}</p>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
