import React, { useState, useEffect } from 'react';
import MovieCard2 from './MovieCard2';
import RoleCard2 from './RoleCard2';  // Import the new RoleCard component
import './Mylist.css';

const Mylist = () => {
  const [activeList, setActiveList] = useState('planToWatch');
  const [planToWatchMovies, setPlanToWatchMovies] = useState([]);
  const [watchedMovies, setWatchedMovies] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [favoriteRoles, setFavoriteRoles] = useState([]);  // New state for favorite roles

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

        // Fetch favorite roles
        const favoriteRolesResponse = await fetch('http://localhost:5000/media/favorite/roles', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user_id: localStorage.getItem('user_id') }),
        });
        const favoriteRolesData = await favoriteRolesResponse.json();
        setFavoriteRoles(favoriteRolesData);
        console.log('Favorite roles:', favoriteRolesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleButtonClick = (list) => {
    setActiveList(list);
  };

  // Add delete function for roles
  const handleDeleteRole = async (id) => {
    try {
      await fetch('http://localhost:5000/media/favorite/roles/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: localStorage.getItem('user_id'), role_id: id }),
      });
      setFavoriteRoles(favoriteRoles.filter(role => role.id !== id));

      // window.location.reload();
      const favoriteRolesResponse = await fetch('http://localhost:5000/media/favorite/roles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: localStorage.getItem('user_id') }),
      });
      const favoriteRolesData = await favoriteRolesResponse.json();
      setFavoriteRoles(favoriteRolesData);


    } catch (error) {
      console.error('Error deleting role:', error);
    }
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
      <h1 className="my-list-container-title"><i class="fa-regular fa-bookmark"></i>My Lists</h1>
      <div className="button-container">
        <button
          className={`list-button ${activeList === 'planToWatch' ? 'active' : ''}`}
          onClick={() => handleButtonClick('planToWatch')}
        >
          PLAN TO WATCH
        </button>
        <button
          className={`list-button ${activeList === 'watched' ? 'active' : ''}`}
          onClick={() => handleButtonClick('watched')}
        >
          WATCHED
        </button>
        <button
          className={`list-button ${activeList === 'favorite' ? 'active' : ''}`}
          onClick={() => handleButtonClick('favorite')}
        >
          FAVORITE
        </button>
        <button
          className={`list-button ${activeList === 'favoriteRoles' ? 'active' : ''}`}
          onClick={() => handleButtonClick('favoriteRoles')}
        >
          FAVORITE ROLES
        </button>
      </div>
      <div className="movie-list1">
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
        {activeList === 'favoriteRoles' && (
          <div className='favrole-con'>
            <h2>Actors</h2>
            {favoriteRoles
              .filter((role) => role.ROLE_TYPE === 'ACTOR')
              .map((role) => (
                <RoleCard2
                  key={role.NAME}
                  role={role}
                  handleDeleteRole={() => handleDeleteRole(role.ROLE_ID)}
                />
              ))}

            <h2>Actresses</h2>
            {favoriteRoles
              .filter((role) => role.ROLE_TYPE === 'ACTRESS')
              .map((role) => (
                <RoleCard2
                  key={role.NAME}
                  role={role}
                  handleDeleteRole={() => handleDeleteRole(role.ROLE_ID)}
                />
              ))}

            <h2>Directors</h2>
            {favoriteRoles
              .filter((role) => role.ROLE_TYPE === 'DIRECTOR')
              .map((role) => (
                <RoleCard2
                  key={role.NAME}
                  role={role}
                  handleDeleteRole={() => handleDeleteRole(role.ROLE_ID)}
                />
              ))}

            <h2>Writers</h2>
            {favoriteRoles
              .filter((role) => role.ROLE_TYPE === 'WRITER')
              .map((role) => (
                <RoleCard2
                  key={role.NAME}
                  role={role}
                  handleDeleteRole={() => handleDeleteRole(role.ROLE_ID)}
                />
              ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default Mylist;
