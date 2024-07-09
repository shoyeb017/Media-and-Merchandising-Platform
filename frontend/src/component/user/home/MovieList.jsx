import React from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import MovieCardcopy from './MovieCardcopy';
import './MovieList.css';

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1024 },
    items: 5,
    slidesToSlide: 2,
  },
  desktop: {
    breakpoint: { max: 1024, min: 800 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 800, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const MovieList = ({ movies, title }) => {
  if (!Array.isArray(movies)) {
    console.error('Expected an array of movies:', movies);
    return null;
  }

  const movielist = movies.map((movie) => (
    <MovieCardcopy key={movie.id} movie={movie} /> // Ensure each MovieCardcopy has a unique key and pass the movie item as props
  ));

  return (
    <div className="movie-list-container">
      <h1 className="movie-list-title">{title}</h1>
      <Carousel
        showDots={false}
        responsive={responsive}
        itemClass="carousel-item-padding-40-px" // Example: add custom class if needed
      >
        {movielist}
      </Carousel>
    </div>
  );
};

export default MovieList;
