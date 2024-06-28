import React, { useState } from 'react';
import SearchFilter from './SearchFilter';
import SearchResults from './SearchResults';
import './Search.css';

const Search = ({movies}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    // const mockResults = [
    // { imgSrc: 'img/1.jpeg', title: 'Her', description: '1Lorem ipsum dolor sit amet consectetur adipisicing elit. At hic fugit similique accusantium.' , genre: ['Action', 'Comedy'] },
    // { imgSrc: 'img/2.jpeg', title: 'Inception', description: '2Lorem ipsum dolor sit amet consectetur adipisicing elit. At hic fugit similique accusantium.' , genre: ['Drama']},
    // { imgSrc: 'img/3.jpg', title: 'Interstellar', description: '3Lorem ipsum dolor sit amet consectetur adipisicing elit. At hic fugit similique accusantium.' , genre: ['Action', 'Drama'] },
    // { imgSrc: 'img/4.jpg', title: 'The Dark Knight', description: '4Lorem ipsum dolor sit amet consectetur adipisicing elit. At hic fugit similique accusantium.' , genre: ['Comedy'] },
    // { imgSrc: 'img/5.jpg', title: 'The Shawshank Redemption', description: '5Lorem ipsum dolor sit amet consectetur adipisicing elit. At hic fugit similique accusantium.' , genre: ['Horror'] },
    // { imgSrc: 'img/6.jpg', title: 'The Godfather', description: '6Lorem ipsum dolor sit amet consectetur adipisicing elit. At hic fugit similique accusantium.' , genre: ['Comedy']},
    // { imgSrc: 'img/7.jpg', title: 'The Godfather II', description: '7Lorem ipsum dolor sit amet consectetur adipisicing elit. At hic fugit similique accusantium.' , genre: ['Action', 'Drama']},
    // ];

    //change korle ekhane korbo----------

    const filteredResults = movies.filter(movie =>
      (searchTerm === '' || movie.title.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedGenres.length === 0 || selectedGenres.every(genre => movie.genre.includes(genre)))
    );

    setResults(filteredResults);
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
