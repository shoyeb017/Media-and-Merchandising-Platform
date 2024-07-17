import React, { useEffect, useState } from "react";
import MovieCard from './MovieCard';
import './Home.css';

function Home({ com_id }) { // Accept com_id as a prop
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const Response = await fetch('http://localhost:5000/mymedia', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ com_id: localStorage.getItem('user_id') }),
        });
        const Data = await Response.json();
        setMovies(Data);
      } catch (error) {
        console.error('Error fetching media data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="home-container"></div>
      <h1 className="title-home">WELCOME  TO  MMA  PLATFROM</h1>
      <h1 className="title-home2">⚪ Connecting Media, Driving Merchandising ⚪</h1>
      <div className="mymedia-container">
      <h2 className="title-mymedia">My Media</h2>
        <div className="mymedia-form">
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
