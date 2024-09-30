import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './MovieCard.css';

const MovieCard = ({ movie }) => {
  const [username, setUsername] = useState('');
  const [isHovered, setIsHovered] = useState(false); // State for hover
  const [isHovered1, setIsHovered1] = useState(false);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  // Convert to async function to handle the fetch call
  async function handleAddToWatchList() {
    const userId = localStorage.getItem('user_id'); // Get userId from localStorage
    if (!userId) {
      console.error("No user ID found in localStorage");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/media/mylist/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
          media_id: movie.id, // Use the movie's ID
          status: "PLAN_TO_WATCH",
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add to watchlist');
      }

      console.log("Added to WatchList");
    } catch (error) {
      console.error("Error updating plan to watch list:", error);
    }
  }

  return (
    <Link to={`/${username}/media/${movie.id}`} className="link-product-card">
      <div className="movie-card">
        <img className="movie-card-img" src={movie.img} alt={movie.title} />
        <div className="movie-card-content">
          <p className="movie-card-content-title">{movie.title}</p>
          <p className="movie-card-content-rate">{movie.rating} <i className="fa fa-star"></i></p>
          <p className="movie-card-content-episode">{movie.type}</p>
          <p className="movie-card-content-episode">{movie.episodes} Episodes</p>
          <p className="movie-card-content-desc">{movie.description}</p>
          <div className="movie-card-content-buttons">
            <div 
              className="tooltip-container1"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <Link to={`/${username}/media/${movie.id}`} className="featured-link">
                <button className="movie-card-content-button1">
                  <i className="fa fa-bars"></i>
                </button>
              </Link>
              {isHovered && <div className="tooltip">Details</div>}
            </div>

            <div 
              className="tooltip-container1"
              onMouseEnter={() => setIsHovered1(true)}
              onMouseLeave={() => setIsHovered1(false)}
            >
              {/* Avoid executing function immediately */}
              <button className="movie-card-content-button1" onClick={handleAddToWatchList}>
                <i className="fa fa-bookmark"></i>
              </button>
              {isHovered1 && <div className="tooltip">Add to WatchList</div>}
            </div>
          </div>
        </div>
        <h3 className="movie-card-title">{movie.title}</h3>
        <h3 className="movie-card-type">{movie.type}</h3>
      </div>
    </Link>
  );
};

export default MovieCard;
