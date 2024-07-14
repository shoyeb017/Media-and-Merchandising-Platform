import React, { useState, useEffect } from 'react';
import MovieCard2 from './MovieCard2';
import './Mylist.css';

const Mylist = () => {
  const [activeList, setActiveList] = useState('planToWatch');
  const [planToWatchMovies, setPlanToWatchMovies] = useState([]);
  const [watchedMovies, setWatchedMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const planToWatchResponse = await fetch('http://localhost:5000/media/planToWatch', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user_id: localStorage.getItem('user_id') }),
        });
        const planToWatchData = await planToWatchResponse.json();
        setPlanToWatchMovies(planToWatchData);

        const watchedResponse = await fetch('http://localhost:5000/media/watched', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user_id: localStorage.getItem('user_id') }),
        });
        const watchedData = await watchedResponse.json();
        setWatchedMovies(watchedData);
      } catch (error) {
        console.error('Error fetching movie data:', error);
      }
    };

    fetchData();
  }, []);

  const handleButtonClick = (list) => {
    setActiveList(list);
  };

  const handleDeleteMovie = async (id, list) => {
    if(list === 'planToWatch') {
      try {
        await fetch('http://localhost:5000/media/planToWatch', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user_id: localStorage.getItem('user_id'), media_id: id }),
        });
        setPlanToWatchMovies(planToWatchMovies.filter(movie => movie.id !== id));
      } catch (error) {
        console.error('Error deleting movie:', error);
      }
    }else if(list === 'watched') {
      try {
        await fetch('http://localhost:5000/media/watched', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user_id: localStorage.getItem('user_id'), media_id: id }),
        });
        setWatchedMovies(watchedMovies.filter(movie => movie.id !== id));
      } catch (error) {
        console.error('Error deleting movie:', error);
      }
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
        {activeList === 'planToWatch' &&
          planToWatchMovies.map((movie) => (
            <MovieCard2
              key={movie.id || movie.tempId}
              movie={movie}
              handleDeleteMovie={() => handleDeleteMovie(movie.id, 'planToWatch')}
            />
          ))}
        {activeList === 'watched' &&
          watchedMovies.map((movie) => (
            <MovieCard2
              key={movie.id || movie.tempId}
              movie={movie}
              handleDeleteMovie={() => handleDeleteMovie(movie.id, 'watched')}
            />
          ))}
      </div>

    </div>
  );
};

export default Mylist;
