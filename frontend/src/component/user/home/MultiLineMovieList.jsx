import React, { useEffect, useState } from 'react';
import MovieCard from './MovieCardSmall';
import './MultiLineMovieList.css';

const MultiLineMovieList = ({ data }) => {
  const [roleMedia, setRoleMedia] = useState([]);
  const [showAll, setShowAll] = useState(false); // For toggling view all

  useEffect(() => {
    const fetchRoleMedia = async () => {
      try {
        const response = await fetch('http://localhost:5000/media/rolemedia', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ role_ids: data.map(d => d.ROLE_ID) }), // Send all ROLE_IDs at once
        });

        if (!response.ok) {
          throw new Error('Failed to fetch media');
        }

        const allRoleMedia = await response.json(); // Array of role media objects
        setRoleMedia(allRoleMedia);
      } catch (error) {
        console.error('Error fetching role media:', error);
      }
    };

    fetchRoleMedia();
  }, [data]);

  if (!Array.isArray(roleMedia)) {
    console.error('Expected an array of data:', roleMedia);
    return null;
  }

  const roleMediaList = roleMedia
    .slice(0, showAll ? roleMedia.length : 2) // Show all or 2 based on toggle
    .map((lineData, index) => (
      <div key={index} className="movie-list-line">
        <div className="header">
          <img src={lineData.image} alt={lineData.name} className="header-image" />
          <p className="header-name">{lineData.name}</p>
        </div>
        <div className="movies-grid">
          {Array.isArray(lineData.movies) &&
            lineData.movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
        </div>
      </div>
    ));

  return (
    <div className="multi-line-movie-list">
      <p className="multi-line-movie-list-title"><i className="fa fa-users"></i>Medias from your favorite Actors</p>
      {roleMediaList}
      {roleMedia.length > 2 && (
        <button onClick={() => setShowAll(!showAll)} className="view-toggle-button">
          {showAll ? 'Show Less' : 'SHOW MORE'}
        </button>
      )}
    </div>
  );
};

export default MultiLineMovieList;
