import React from "react";
import Navbar from "../common/Navbar";
import Sidebar from "../Sidebar";
import FeaturedContent from "./FeaturedContent";
import MovieList from "./MovieList";

function Home({movies}) {
    return (
      <div>
        <FeaturedContent />
        <div className="content-container" >
          <MovieList movies={movies} title="Horror" />
          <MovieList movies={movies} title="Romance" />
          <MovieList movies={movies} title="Comedy" />
        </div>
      </div>
    );
  }

  export default Home;