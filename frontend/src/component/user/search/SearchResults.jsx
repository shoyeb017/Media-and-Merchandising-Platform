import React from 'react';
import MovieCardcopy from '../home/MovieCardcopy.jsx';
import './SearchResults.css';

const SearchResults = ({ results }) => {
  return (
    <>
    <h3 className="search-results-title">Filter Results</h3>
    <div className="search-results">
      {results.map((result, index) => (
        <MovieCardcopy key={index} movie={result}/>
      ))}
    </div>
    </>
  );
};

export default SearchResults;
