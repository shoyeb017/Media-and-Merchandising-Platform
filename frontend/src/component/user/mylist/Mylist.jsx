import React, { useState, useEffect } from 'react';
import MovieCard2 from './MovieCard2';
import './Mylist.css';

const Mylist = () => {
  const [activeList, setActiveList] = useState('planToWatch');
  const [planToWatchMovies, setPlanToWatchMovies] = useState([]);
  const [watchedMovies, setWatchedMovies] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);


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

        const favoriteResponse = await fetch('http://localhost:5000/media/favorite/mylist', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user_id: localStorage.getItem('user_id') }),
        });
        const favoriteData = await favoriteResponse.json();
        setFavoriteMovies(favoriteData);
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
        console.log('Deleting movie:',id,list);
        console.log('user_id:',localStorage.getItem('user_id'));
        await fetch('http://localhost:5000/media/planToWatch/delete', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user_id: localStorage.getItem('user_id'), media_id: id }),
        });
        setPlanToWatchMovies(planToWatchMovies.filter(movie => movie.id !== id));
        // window.location.reload();
        const planToWatchResponse = await fetch('http://localhost:5000/media/planToWatch', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user_id: localStorage.getItem('user_id') }),
        });
        const planToWatchData = await planToWatchResponse.json();
        setPlanToWatchMovies(planToWatchData);

      } catch (error) {
        console.error('Error deleting movie:', error);
      }
    }else if(list === 'watched') {
      try {
        await fetch('http://localhost:5000/media/watched/delete', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user_id: localStorage.getItem('user_id'), media_id: id }),
        });
        setWatchedMovies(watchedMovies.filter(movie => movie.id !== id));
        // window.location.reload();
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
        console.error('Error deleting movie:', error);
      }
    } else if(list === 'favorite') {
      try {
        await fetch('http://localhost:5000/media/favorite/delete', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user_id: localStorage.getItem('user_id'), media_id: id }),
        });
        setFavoriteMovies(favoriteMovies.filter(movie => movie.id !== id));
        // window.location.reload();
        const favoriteResponse = await fetch('http://localhost:5000/media/favorite/mylist', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user_id: localStorage.getItem('user_id') }),
        });
        const favoriteData = await favoriteResponse.json();
        setFavoriteMovies(favoriteData);

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
        <button
          className={`list-button ${activeList === 'favorite' ? 'active' : ''}`}
          onClick={() => handleButtonClick('favorite')}
        >
          Favorite
        </button>

      </div>
      <div className="movie-list">
        {activeList === 'planToWatch' &&
          planToWatchMovies.map((movie) => (
            <MovieCard2
              key={movie.MEDIA_ID}
              movie={movie}
              handleDeleteMovie={() => handleDeleteMovie(movie.MEDIA_ID, 'planToWatch')}
            />
          ))}
        {activeList === 'watched' &&
          watchedMovies.map((movie) => (
            <MovieCard2
              key={movie.MEDIA_ID}
              movie={movie}
              handleDeleteMovie={() => handleDeleteMovie(movie.MEDIA_ID, 'watched')}
            />
          ))}
        {activeList === 'favorite' &&
          favoriteMovies.map((movie) => (
            <MovieCard2
              key={movie.MEDIA_ID}
              movie={movie}
              handleDeleteMovie={() => handleDeleteMovie(movie.MEDIA_ID, 'favorite')}
            />
          ))}
      </div>

    </div>
  );
};

export default Mylist;
