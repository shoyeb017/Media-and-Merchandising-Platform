import React from 'react';
import './MovieCard2.css';

const MovieCard2 = ({ imgSrc, title, description }) => {
  return (
    <div className="movie-card2">
      <img className="movie-card2-img" src={imgSrc} alt={title} />
      {/* <span className="movie-card2-title">{title}</span> */}
      <p className="movie-card2-desc">
        {description}
      </p>
      {/* <button className="movie-card2-button">Watch</button> */}
      <h3 className="movie-card2-title">{title}</h3>
    </div>

  );
};

export default MovieCard2;
