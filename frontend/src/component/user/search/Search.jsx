import React, { useState, useEffect } from 'react';
import SearchFilter from './SearchFilter';
import SearchResults from './SearchResults';
import './Search.css';


const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedMediaType, setSelectedMediaType] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {



      if (searchTerm === '' && selectedGenres.length === 0 && selectedMediaType === "") {
        console.log('fetching all media');
        const response = await fetch('http://localhost:5000/media', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch media');
        }
        const media = await response.json();
        setResults(media);
        return;
      }




      else if(selectedMediaType === "")
      {     
        console.log('searching for media:', selectedGenres);
        const response = await fetch(`http://localhost:5000/media/search/genre`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ searchTerm, selectedGenres }),
        });
        if (response.ok) {
          const data = await response.json();
          setResults(data);
        }
        return;
      }




      console.log('searching for media:', { searchTerm, selectedGenres, selectedMediaType });
      const response = await fetch('http://localhost:5000/media/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ searchTerm, selectedGenres, selectedMediaType }),
      });
      if (response.ok) {
        const data = await response.json();
        setResults(data);
      } else {
        console.error('Failed to search');
      }
    } catch (err) {
      console.error('Failed to search:', err);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [searchTerm, selectedGenres, selectedMediaType]);

  return (
    <div>
      <SearchFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        selectedMediaType={selectedMediaType}
        setSelectedMediaType={setSelectedMediaType}
      />
      <SearchResults results={results} />
    </div>
  );
};

export default Search;
