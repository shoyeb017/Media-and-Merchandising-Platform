import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import "./Home.css";

function Home({ com_id }) {
  // Accept com_id as a prop
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const Response = await fetch("http://localhost:5000/mymedia", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ com_id: localStorage.getItem("user_id") }),
        });
        const Data = await Response.json();
        setMovies(Data);
      } catch (error) {
        console.error("Error fetching media data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="mymedia-container2">
        <h2 className="title-mymedia2">My Media</h2>
        <div className="mymedia-form1">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
