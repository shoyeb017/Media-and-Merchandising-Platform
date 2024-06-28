import React, { useState } from 'react';
import MovieCard from '../home/MovieCard';
import './Mylist.css';

const Mylist = ({planToWatchMovies , watchedMovies}) => {
    const [activeList, setActiveList] = useState('planToWatch');

  //   const planToWatchMovies = [ {

  //     id: 1,
  //     img: '/img/3.jpg',
  //     title: 'Example Movie Title',
  //     description: 'This is an example description of the movie. This is an example description of the movie. This is an example description of the movie. This is an example description of the movie. This is an example description of the movie. This is an example description of the movie. This is an example description of the movie. This is an example description of the movie. This is an example description of the movie.',
  //     rating: 4.5,
  //     releaseDate: '2023-06-20',
  //     type: 'Movie',
  //     episodes: 0,
  //     duration: '2h 30m',
  //     genre: ['Action', 'Adventure', 'Adventure', 'Adventure', 'Adventure', 'Adventure'],
  //     companyName: 'Example Productions',
  //     role: [
  //       { img: '/img/6.jpg', name: 'Actor 1', roleType: 'Lead' },
  //       { img: '/img/7.jpg', name: 'Actor 2', roleType: 'Supporting' },
  //       { img: '/img/6.jpg', name: 'Actor 1', roleType: 'Lead' },
  //       { img: '/img/7.jpg', name: 'Actor 2', roleType: 'Supporting' },
  //       { img: '/img/6.jpg', name: 'Actor 1', roleType: 'Lead' }
  //     ],
  //     news: [
  //       { title: 'News Title 1 News Title 1 News Title 1 News Title 1 News Title 1 ', description: '"The Boys" stars share which scene the superhero series should be known for and more in our interview with the cast.' },
  //       { title: 'News Title 2', description: "There's nothing more that I can really say about The Boys that hasn't already been said. It's just a flat out awesome show! It's easily become one of my favorite new shows in years! I binged the entire first two seasons in just a few days when they first came out and rewatched them again for the second time before Season 3 came out. I was expecting a little bit of a drop off for Season 3 because Season 1 and 2 were so great, and there is a little drop in quality but it's still a very good show! It takes everything you loved about Season 1 and 2 (the violence, humor, heart, craziness, character development, etc.) and takes it all to a whole new level! This show has such an original take on the Superhero genre that is both exciting and hilarious! I can not recommend this show enough! Just a warning though...once you start watching it it's hard to stop. Give yourself enough time because you'll want to binge it as quickly as possible!" }
  //     ],
  //     review: [
  //       { name: 'Alice', description: 'Great product!', rating: 5 },
  //       { name: 'Bob', description: 'Not bad', rating: 3 }
  //     ]
  // }];

  //   const watchedMovies =[ {

  //     id: 1,
  //     img: '/img/3.jpg',
  //     title: 'Example Movie Title',
  //     description: 'This is an example description of the movie. This is an example description of the movie. This is an example description of the movie. This is an example description of the movie. This is an example description of the movie. This is an example description of the movie. This is an example description of the movie. This is an example description of the movie. This is an example description of the movie.',
  //     rating: 4.5,
  //     releaseDate: '2023-06-20',
  //     type: 'Movie',
  //     episodes: 0,
  //     duration: '2h 30m',
  //     genre: ['Action', 'Adventure', 'Adventure', 'Adventure', 'Adventure', 'Adventure'],
  //     companyName: 'Example Productions',
  //     role: [
  //       { img: '/img/6.jpg', name: 'Actor 1', roleType: 'Lead' },
  //       { img: '/img/7.jpg', name: 'Actor 2', roleType: 'Supporting' },
  //       { img: '/img/6.jpg', name: 'Actor 1', roleType: 'Lead' },
  //       { img: '/img/7.jpg', name: 'Actor 2', roleType: 'Supporting' },
  //       { img: '/img/6.jpg', name: 'Actor 1', roleType: 'Lead' }
  //     ],
  //     news: [
  //       { title: 'News Title 1 News Title 1 News Title 1 News Title 1 News Title 1 ', description: '"The Boys" stars share which scene the superhero series should be known for and more in our interview with the cast.' },
  //       { title: 'News Title 2', description: "There's nothing more that I can really say about The Boys that hasn't already been said. It's just a flat out awesome show! It's easily become one of my favorite new shows in years! I binged the entire first two seasons in just a few days when they first came out and rewatched them again for the second time before Season 3 came out. I was expecting a little bit of a drop off for Season 3 because Season 1 and 2 were so great, and there is a little drop in quality but it's still a very good show! It takes everything you loved about Season 1 and 2 (the violence, humor, heart, craziness, character development, etc.) and takes it all to a whole new level! This show has such an original take on the Superhero genre that is both exciting and hilarious! I can not recommend this show enough! Just a warning though...once you start watching it it's hard to stop. Give yourself enough time because you'll want to binge it as quickly as possible!" }
  //     ],
  //     review: [
  //       { name: 'Alice', description: 'Great product!', rating: 5 },
  //       { name: 'Bob', description: 'Not bad', rating: 3 }
  //     ]
  // }];

    const handleButtonClick = (list) => {
      setActiveList(list);
    };

    return (
      <div className="my-list-container">
        <div className="button-container">
          <button
            className={`list-button ${activeList === 'planToWatch' ? 'active' : ''}`}
            onClick={() => handleButtonClick('planToWatch')}
          >
            Plan to Watch
          </button>
          <button
            className={`list-button ${activeList === 'watched' ? 'active' : ''}`}
            onClick={() => handleButtonClick('watched')}
          >
            Watched
          </button>
        </div>
        <div className="movie-list">
          {activeList === 'planToWatch' && planToWatchMovies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
          {activeList === 'watched' && watchedMovies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      </div>
    );
};

export default Mylist;
