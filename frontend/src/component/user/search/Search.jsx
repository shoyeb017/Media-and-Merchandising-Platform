import React, { useState } from 'react';
import SearchFilter from './SearchFilter';
import SearchResults from './SearchResults';
import './Search.css';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [results, setResults] = useState([]);

  // const handleSearch = () => {
    //change korle ekhane korbo----------

    // const filteredResults = movies.filter(movie =>
    //   (searchTerm === '' || movie.title.toLowerCase().includes(searchTerm.toLowerCase())) &&
    //   (selectedGenres.length === 0 || selectedGenres.every(genre => movie.genre.includes(genre)))
    // );

    // const filteredResults = movies.filter(movie =>

    // setResults(filteredResults);
  // };

  const handleSearch = async () => {
    try {
      if (searchTerm === '' && selectedGenres.length === 0) {
        console.log('fetching all movies');
        const response = await fetch(`http://localhost:5000/media`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
        if (!response.ok) {
          throw new Error('Failed to fetch movies');
        }
        const movies = await response.json();
        setResults(movies);
        return;
      }
      const response = await fetch(`http://localhost:5000/media/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ searchTerm, selectedGenres }),
      });
      if (response.ok) {
        const data = await response.json();
        setResults(data);
      } else {
        console.error('Failed to search');
      }
    }catch (err) {
      console.error('Failed to search:', err);
     
    }
  };

  return (
    <div>
      <SearchFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        handleSearch={handleSearch}
      />
      <SearchResults results={results} />
    </div>
  );
};

export default Search;
