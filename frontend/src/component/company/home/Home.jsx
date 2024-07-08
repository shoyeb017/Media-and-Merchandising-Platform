import React from "react";
import Navbar from "../common/Navbar";
import FeaturedContent from "./FeaturedContent";
import MovieList from "./MovieList";

function Home({movies}) {
    return (
      <div>
        <h1>company_Home</h1>
        {/* <FeaturedContent />
        <div className="content-container" >
          <MovieList movies={movies} title="Horror" />
          <MovieList movies={movies} title="Romance" />
          <MovieList movies={movies} title="Comedy" />
        </div> */}
      </div>
    );
  }

  export default Home;