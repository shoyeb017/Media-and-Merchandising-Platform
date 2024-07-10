import React from "react";
import Navbar from "../common/Navbar";
import FeaturedContent from "./FeaturedContent";
import MovieList from "./MovieList";

function Home() {
  let selectedGenres=[];
  const searchTerm=''
  const [actionMovies, setActionMovies] = React.useState([]);
  const [horrorMovies, setHorrorMovies] = React.useState([]);
  const [romanceMovies, setRomanceMovies] = React.useState([]);
  const [comedyMovies, setComedyMovies] = React.useState([]);

  const fetchMoviesByGenre = async ( setMovies) => {
    try {
      
      console.log('fetching movies by genre:', selectedGenres);
      console.log('selectedGenres array:', selectedGenres);
      console.log('Request payload:', JSON.stringify({ searchTerm, selectedGenres }));
      
      const response = await fetch('http://localhost:5000/media/search/genre', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ searchTerm, selectedGenres }),
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('Response data:', data);
        setMovies(Array.isArray(data) ? data : []);
      } else {
        console.error('Failed to search. Status:', response.status);
      }
    } catch (err) {
      console.error('Failed to search:', err);
    }
  };
  
  

  React.useEffect(() => {
    selectedGenres=['ACTION'];
    fetchMoviesByGenre( setActionMovies);
    selectedGenres=['HORROR'];
    fetchMoviesByGenre( setHorrorMovies);
    selectedGenres=['ROMANCE'];
    fetchMoviesByGenre( setRomanceMovies);
    selectedGenres=['COMEDY'];
    fetchMoviesByGenre( setComedyMovies);
  }, []);

  return (
    <div>
      <Navbar />
      <FeaturedContent />
      <div className="content-container">
        <MovieList movies={actionMovies} title="Action" />
        <MovieList movies={horrorMovies} title="Horror" />
        <MovieList movies={romanceMovies} title="Romance" />
        <MovieList movies={comedyMovies} title="Comedy" />
      </div>
    </div>
  );
}

export default Home;
