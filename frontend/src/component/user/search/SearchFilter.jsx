import React from "react";
import "./SearchFilter.css";

const genres = [
  "ACTION",
  "ADVENTURE",
  "COMEDY",
  "DRAMA",
  "FANTASY",
  "HISTORICAL",
  "HORROR",
  "MAGIC",
  "MYSTERY",
  "PSYCHOLOGICAL",
  "ROMANCE",
  "SCI-FI",
  "SUPERNATURAL",
  "SPORTS",
  "THRILLER",
  "TRAGEDY",
];

const mediaTypes = ["MOVIE", "TV_SHOW", "ANIME", "DOCUMENTARY"];

const SearchFilter = ({
  searchTerm,
  setSearchTerm,
  selectedGenres,
  setSelectedGenres,
  selectedMediaType,
  setSelectedMediaType,
}) => {
  const handleGenreClick = (genre) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((g) => g !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const handleMediaTypeClick = (type) => {
    setSelectedMediaType(type === selectedMediaType ? "" : type);
  };

  return (
    <div className="search-filter1">
      <h3 className="search-title1">Search</h3>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for a media..."
        className="search-filter1-search-bar"
      />
      <h3 className="genre-title1">Type</h3>
      <div className="genres1">
        {mediaTypes.map((type) => (
          <button
            key={type}
            className={`genre-button1 ${
              selectedMediaType === type ? "selected" : ""
            }`}
            onClick={() => handleMediaTypeClick(type)}
          >
            {type}
          </button>
        ))}
      </div>
      <h3 className="genre-title1">Genres</h3>
      <div className="genres1">
        {genres.map((genre) => (
          <button
            key={genre}
            className={`genre-button1 ${
              selectedGenres.includes(genre) ? "selected" : ""
            }`}
            onClick={() => handleGenreClick(genre)}
          >
            {genre}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchFilter;
