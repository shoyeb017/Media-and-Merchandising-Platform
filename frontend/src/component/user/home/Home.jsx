import React, { useEffect } from "react";
import Navbar from "../common/Navbar";
import FeaturedContent from "./FeaturedContent";
import MovieList from "./MovieList";
import MultiLineMovieList from './MultiLineMovieList';
import HomeNews from "./HomeNews";

function Home() {
  const [foryouMovies, setForYouMovies] = React.useState([]);
  const [actionMovies, setActionMovies] = React.useState([]);
  const [horrorMovies, setHorrorMovies] = React.useState([]);
  const [romanceMovies, setRomanceMovies] = React.useState([]);
  const [comedyMovies, setComedyMovies] = React.useState([]);
  const [roleData, setRoleData] = React.useState([]);
  const [empData, setEmpData] = React.useState([]);

  const fetchMoviesByGenre = async (genre, setMovies) => {
    try {
      const response = await fetch('http://localhost:5000/media/search/genre', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ searchTerm: '', selectedGenres: [genre] }),
      });

      if (response.ok) {
        const data = await response.json();
        setMovies(Array.isArray(data) ? data : []);
      } else {
        console.error('Failed to search. Status:', response.status);
      }
    } catch (err) {
      console.error('Failed to search:', err);
    }
  };

  const fetchForYouMovies = async () => {
    try {
      const response = await fetch('http://localhost:5000/media/foryou', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: localStorage.getItem('user_id') }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch media');
      }

      const media = await response.json();
      setForYouMovies(media);
    } catch (err) {
      console.error('Failed to fetch for you movies:', err);
    }
  };

  useEffect(() => {
    const fetchFavRoleMovies = async () => {
      try {
        const response = await fetch('http://localhost:5000/media/favRole', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user_id: localStorage.getItem('user_id') }),
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch favorite role media');
        }
  
        const media = await response.json();
        setRoleData(media);
      } catch (err) {
        console.error('Failed to fetch favorite role movies:', err);
      }
    };

    fetchFavRoleMovies();
  }, []);

  React.useEffect(() => {
    fetchForYouMovies();
    fetchMoviesByGenre('ACTION', setActionMovies);
    fetchMoviesByGenre('HORROR', setHorrorMovies);
    fetchMoviesByGenre('ROMANCE', setRomanceMovies);
    fetchMoviesByGenre('COMEDY', setComedyMovies);
  }, []);

  return (
    <div>
      <Navbar />
      <FeaturedContent />
      <div className="content-container">
        <MovieList movies={foryouMovies} title="Top Picks for You" />
        {roleData.length > 0 && (
          <>
            
            <MultiLineMovieList data={roleData} />
          </>
        )}
        <MovieList movies={actionMovies} title="Action" />
        <HomeNews />
        <MovieList movies={horrorMovies} title="Horror" />
        <MovieList movies={romanceMovies} title="Romance" />
        <MovieList movies={comedyMovies} title="Comedy" />
      </div>
    </div>
  );
}

export default Home;
