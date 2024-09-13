import React, { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import MovieCard from './MovieCard';
import './MultiLineMovieList.css';

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1024 },
    items: 5,
    slidesToSlide: 2,
  },
  desktop: {
    breakpoint: { max: 1024, min: 800 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 800, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};



  const MultiLineMovieList = ({ data }) => {

    const [roleMedia, setRoleMedia] = useState([]);

  useEffect(() => {
    const fetchRoleMedia = async () => {
      try {
        const allRoleMedia = [];
        for (let i = 0; i < data.length; i++) {
          const response = await fetch('http://localhost:5000/media/rolemedia', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ role_id: data[i].ROLE_ID }),
          });

          if (!response.ok) {
            throw new Error('Failed to fetch media');
          }

          const roleData = await response.json();
          allRoleMedia.push(roleData);
        }
        setRoleMedia(allRoleMedia);
      } catch (error) {
        console.error('Error fetching role media:', error);
      }
    };

    fetchRoleMedia();
  }, [data]); 


    if (!Array.isArray(roleMedia)) {
      console.error('Expected an array of data:', roleMedia);
      return null;
    }

    
  
    const roleMediaList = roleMedia.map((lineData, index) => (
      console.log(lineData),
      <div key={index} className="movie-list-line">
        <div className="header">
          <img src={lineData.image} alt={lineData.name} className="header-image"/>
          <div className="header-name">{lineData.name}</div>
        </div>
        <Carousel
          showDots={false}
          responsive={responsive}
          itemClass="carousel-item-padding-40-px"
        >
          {Array.isArray(lineData.movies)  && lineData.movies.map((movie) => (
            console.log(movie),
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </Carousel>
      </div>
    ));
  
    return (
      <div className="multi-line-movie-list">
        {roleMediaList}
      </div>
    );
  };
  export default MultiLineMovieList;