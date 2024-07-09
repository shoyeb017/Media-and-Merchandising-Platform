import React from "react";
import Navbar from "../common/Navbar";
import FeaturedContent from "./FeaturedContent";
import MovieList from "./MovieList";

function Home() {
  const [actionMovies, setActionMovies] = React.useState([]);
  const [horrorMovies, setHorrorMovies] = React.useState([]);
  const [romanceMovies, setRomanceMovies] = React.useState([]);
  const [comedyMovies, setComedyMovies] = React.useState([]);

  const fetchMoviesByGenre = async (genre, setMovies) => {
    try {
      const searchterm = '';
      const selectedGenres = [genre];
      const response = await fetch(`http://localhost:5000/media/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ searchterm, selectedGenres }),
      });
      
      if (response.ok) {
        const data = await response.json();
        setMovies(data);
      } else {
        console.error('Failed to search');
      }
    }catch (err) {
      console.error('Failed to search:', err);
    }
  };

  React.useEffect(() => {
    fetchMoviesByGenre('ACTION', setHorrorMovies);
    fetchMoviesByGenre('HORROR', setHorrorMovies);
    fetchMoviesByGenre('ROMANCE', setRomanceMovies);
    fetchMoviesByGenre('COMEDY', setComedyMovies);
  }, []);

  return (
    <div>
      <Navbar />
      <FeaturedContent />
      <div className="content-container">
        {/* <MovieList movies={actionMovies} title="Action" /> */}
        <MovieList movies={horrorMovies} title="Horror" />
        {/* <MovieList movies={romanceMovies} title="Romance" /> */}
        <MovieList movies={comedyMovies} title="Comedy" />
      </div>
    </div>
  );
}

export default Home;
