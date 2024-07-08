import React from 'react';
import MovieCard from '../home/MovieCard.jsx';
import './SearchResults.css';

const SearchResults = ({ results }) => {
  return (
    <>
    <h3 className="search-results-title">Filter Results</h3>
    <div className="search-results">
      {results.map((result, index) => (
        <MovieCard key={index} movie={result}/>
      ))}
    </div>
    </>
  );
};

export default SearchResults;
