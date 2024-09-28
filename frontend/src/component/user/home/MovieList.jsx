import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import MovieCard from "./MovieCard";
import MovieCardcopy from "./MovieCardcopy";
import "./MovieList.css";

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
    console.error("Expected an array of movies:", movies);
    return null;
  }

  const movielist = movies.map((movie) =>
    title === "Medias" ? (
      <MovieCardcopy key={movie.id} movie={movie} />
    ) : (
      <MovieCard key={movie.id} movie={movie} />
    )
  );

  const displayText =
    title === "Top Picks for You"
      ? "Recommended for you from your favorites"
      : title === "Medias from your favorite Actors"
      ? "Recommended for you from your favorites roles"
      : title === "Romance"
      ? "Wants some love in life? Then check out these Romantic movies!"
      : title === "Action"
      ? "Craving some adrenaline? Dive into these thrilling Action-packed movies!"
      : title === "Horror"
      ? "Ready for some spine-chilling scares? Watch these bone-chilling Horror movies!"
      : title === "Comedy"
      ? "Need a good laugh? Check out these hilarious Comedy movies!"
      : "Check out these movies!";

  return (
    <div className="movie-list-container">
      <p className="movie-list-title">{title} </p>
      <p className="movie-list-title2">{displayText}</p>
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
