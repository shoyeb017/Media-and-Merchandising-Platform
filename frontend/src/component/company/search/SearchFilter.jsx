import React from 'react';
import './SearchFilter.css';
const genres = ['Action','Adventure','Comedy', 'Drama','Fantasy','Historical', 'Horror','Magic',
              'Mystery','Psychological','Romance','Sci-Fi','Supernatural','Sports','Thriller','Tragedy'];

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