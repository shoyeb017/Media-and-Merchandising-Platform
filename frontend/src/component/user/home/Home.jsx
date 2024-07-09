import React from "react";
import Navbar from "../common/Navbar";
import FeaturedContent from "./FeaturedContent";
import MovieList from "./MovieList";

function Home() {
  const [actionMovies, setActionMovies] = React.useState([]);
  const [romanceMovies, setRomanceMovies] = React.useState([]);
  const [comedyMovies, setComedyMovies] = React.useState([]);
  const [horrorMovies, setHorrorMovies] = React.useState([]);
  const [scifiMovies, setScifiMovies] = React.useState([]);  
  const fetchMoviesByGenre = async (genre, setMovies) => {
    try {
      const response = await fetch(`http://localhost:5000/media/genre?genre=${genre}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }
      const movies = await response.json();
      setMovies(movies);
    } catch (err) {
      console.error(`Failed to fetch ${genre} movies:`, err);
    }
  };

  React.useEffect(() => {
    fetchMoviesByGenre('Horror', setHorrorMovies);
    fetchMoviesByGenre('Romance', setRomanceMovies);
    fetchMoviesByGenre('Comedy', setComedyMovies);
  }, []);

  return (
    <div>
      <Navbar />
      <FeaturedContent />
      <div className="content-container">
        <MovieList movies={horrorMovies} title="Horror" />
        <MovieList movies={romanceMovies} title="Romance" />
        <MovieList movies={comedyMovies} title="Comedy" />
        
      </div>
    </div>
  );
}

export default Home;
