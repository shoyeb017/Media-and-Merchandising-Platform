import React from 'react';
import './SearchFilter.css';
const genres = ['ACTION','ADVENTURE','COMEDY', 'DRAMA','FANTASY','HISTORICAL', 'HORROR','MAGIC',
        'MYSTERY','PSYCHOLOGICAL','ROMANCE','SCI-FI','SUPERNATURAL','SPORTS','THRILLER','TRAGEDY'];

const SearchFilter = ({ searchTerm, setSearchTerm, selectedGenres, setSelectedGenres, handleSearch }) => {
  const handleGenreClick = (genre) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter(g => g !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  return (
    <div className="search-filter">
      <h3 className="search-title">Search</h3>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for a media..."
      />
      <h3 className="genre-title">Genres</h3>
      <div className="genres">
        {genres.map((genre) => (
          <button
            key={genre}
            className={`genre-button ${selectedGenres.includes(genre) ? 'selected' : ''}`}
            onClick={() => handleGenreClick(genre)}
          >
            {genre}
          </button>
        ))}
      </div>
    <button className="filter-button" onClick={handleSearch}>Filter</button>
    </div>
  );
};

export default SearchFilter;