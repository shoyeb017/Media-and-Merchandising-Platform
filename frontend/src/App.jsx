import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './component/user/common/Navbar';
import ScrollToTop from './component/user/common/ScrollToTop.jsx';
import Search from './component/user/search/Search.jsx';
import Home from './component/user/home/Home.jsx';
import Discussion from './component/user/discussion/Discussion.jsx';
import Mylist from './component/user/mylist/Mylist.jsx';
import Merch from './component/user/merch/Merch.jsx';
import Profile from './component/user/profile/profile.jsx';
import Cart from './component/user/merch/Cart.jsx';
import ProductSection from './component/user/merch/ProductSection.jsx';
import ProductDetails from './component/user/merch/ProductDetails.jsx';
import MovieDetailsPage from './component/user/movie/MovieDetailsPage.jsx';
import CompanySection from './component/user/company/CompanySection.jsx';
import CompanyDetailsPage from './component/user/company/CompanyDetailsPage.jsx';
import Login from './component/Login.jsx';
import Layout from './component/Layout.jsx';

import './App.css';




export default function App() {


  const [companies, setCompanies] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetch('http://localhost:5000/companies',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            }
          }
        );
        if(!response.ok) {
          throw new Error('response Error');
        }

        const data =await response.json();
        
        setCompanies(data);

      } catch (error) {
        console.error('fetching Error:', error);
      }
    };
    fetchCompanies();
  }, []);


useEffect(() => {
  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/products',
        {
          method: 'GET',
          header: {
            'Content-Type': 'application/json',
          }
        }
      );
      if(!response.ok) {
        throw new Error('response Error');
      }

      const data = await response.json();
      setProducts(data);

    } catch (error) {
      console.error('fetching Error:', error);
    }
  };
  fetchProducts();
},[]);





const [movies] = useState ([

  {
      id: 1,
      img: '/img/3.jpg',
      title: 'Example Movie Title',
      description: 'This is an example description of the movie. This is an example description of the movie. This is an example description of the movie. This is an example description of the movie. This is an example description of the movie. This is an example description of the movie. This is an example description of the movie. This is an example description of the movie. This is an example description of the movie.',
      rating: 4.5,
      releaseDate: '2023-06-20',
      type: 'Movie',
      episodes: 0,
      duration: '2h 30m',
      genre: ['Action', 'Adventure', 'Adventure', 'Adventure', 'Adventure', 'Adventure'],
      companyName: 'Example Productions',
      role: [
        { img: '/img/6.jpg', name: 'Actor 1', roleType: 'Lead' },
        { img: '/img/7.jpg', name: 'Actor 2', roleType: 'Supporting' },
        { img: '/img/6.jpg', name: 'Actor 1', roleType: 'Lead' },
        { img: '/img/7.jpg', name: 'Actor 2', roleType: 'Supporting' },
        { img: '/img/6.jpg', name: 'Actor 1', roleType: 'Lead' }
      ],
      news: [
        { title: 'News Title 1 News Title 1 News Title 1 News Title 1 News Title 1 ', description: '"The Boys" stars share which scene the superhero series should be known for and more in our interview with the cast.' },
        { title: 'News Title 2', description: "There's nothing more that I can really say about The Boys that hasn't already been said. It's just a flat out awesome show! It's easily become one of my favorite new shows in years! I binged the entire first two seasons in just a few days when they first came out and rewatched them again for the second time before Season 3 came out. I was expecting a little bit of a drop off for Season 3 because Season 1 and 2 were so great, and there is a little drop in quality but it's still a very good show! It takes everything you loved about Season 1 and 2 (the violence, humor, heart, craziness, character development, etc.) and takes it all to a whole new level! This show has such an original take on the Superhero genre that is both exciting and hilarious! I can not recommend this show enough! Just a warning though...once you start watching it it's hard to stop. Give yourself enough time because you'll want to binge it as quickly as possible!" }
      ],
      review: [
        { name: 'Alice', description: 'Great product!', rating: 5 },
        { name: 'Bob', description: 'Not bad', rating: 3 }
      ]
   },

   {
    id: 2,
    img: '/img/4.jpg',
    title: 'Example Movie Title',
    description: 'This is an example description of the movie. This is an example description of the movie. This is an example description of the movie. This is an example description of the movie. This is an example description of the movie. This is an example description of the movie. This is an example description of the movie. This is an example description of the movie. This is an example description of the movie.',
    rating: 4.5,
    releaseDate: '2023-06-20',
    type: 'Movie',
    episodes: 0,
    duration: '2h 30m',
    genre: ['Action', 'Adventure', 'Adventure', 'Adventure', 'Adventure', 'Adventure'],
    companyName: 'Example Productions',
    role: [
      { img: '/img/6.jpg', name: 'Actor 1', roleType: 'Lead' },
      { img: '/img/7.jpg', name: 'Actor 2', roleType: 'Supporting' },
      { img: '/img/6.jpg', name: 'Actor 1', roleType: 'Lead' },
      { img: '/img/7.jpg', name: 'Actor 2', roleType: 'Supporting' },
      { img: '/img/6.jpg', name: 'Actor 1', roleType: 'Lead' }
    ],
    news: [
      { title: 'News Title 1 News Title 1 News Title 1 News Title 1 News Title 1 ', description: '"The Boys" stars share which scene the superhero series should be known for and more in our interview with the cast.' },
      { title: 'News Title 2', description: "There's nothing more that I can really say about The Boys that hasn't already been said. It's just a flat out awesome show! It's easily become one of my favorite new shows in years! I binged the entire first two seasons in just a few days when they first came out and rewatched them again for the second time before Season 3 came out. I was expecting a little bit of a drop off for Season 3 because Season 1 and 2 were so great, and there is a little drop in quality but it's still a very good show! It takes everything you loved about Season 1 and 2 (the violence, humor, heart, craziness, character development, etc.) and takes it all to a whole new level! This show has such an original take on the Superhero genre that is both exciting and hilarious! I can not recommend this show enough! Just a warning though...once you start watching it it's hard to stop. Give yourself enough time because you'll want to binge it as quickly as possible!" }
    ],
    review: [
      { name: 'Alice', description: 'Great product!', rating: 5 },
      { name: 'Bob', description: 'Not bad', rating: 3 }
    ]
 },


 {
  id: 3,
  img: '/img/5.jpg',
  title: 'Example Movie Title',
  description: 'This is an example description of the movie. This is an example description of the movie. This is an example description of the movie. This is an example description of the movie. This is an example description of the movie. This is an example description of the movie. This is an example description of the movie. This is an example description of the movie. This is an example description of the movie.',
  rating: 4.5,
  releaseDate: '2023-06-20',
  type: 'Movie',
  episodes: 0,
  duration: '2h 30m',
  genre: ['Action', 'Adventure', 'Adventure', 'Adventure', 'Adventure', 'Adventure'],
  companyName: 'Example Productions',
  role: [
    { img: '/img/6.jpg', name: 'Actor 1', roleType: 'Lead' },
    { img: '/img/7.jpg', name: 'Actor 2', roleType: 'Supporting' },
    { img: '/img/6.jpg', name: 'Actor 1', roleType: 'Lead' },
    { img: '/img/7.jpg', name: 'Actor 2', roleType: 'Supporting' },
    { img: '/img/6.jpg', name: 'Actor 1', roleType: 'Lead' }
  ],
  news: [
    { title: 'News Title 1 News Title 1 News Title 1 News Title 1 News Title 1 ', description: '"The Boys" stars share which scene the superhero series should be known for and more in our interview with the cast.' },
    { title: 'News Title 2', description: "There's nothing more that I can really say about The Boys that hasn't already been said. It's just a flat out awesome show! It's easily become one of my favorite new shows in years! I binged the entire first two seasons in just a few days when they first came out and rewatched them again for the second time before Season 3 came out. I was expecting a little bit of a drop off for Season 3 because Season 1 and 2 were so great, and there is a little drop in quality but it's still a very good show! It takes everything you loved about Season 1 and 2 (the violence, humor, heart, craziness, character development, etc.) and takes it all to a whole new level! This show has such an original take on the Superhero genre that is both exciting and hilarious! I can not recommend this show enough! Just a warning though...once you start watching it it's hard to stop. Give yourself enough time because you'll want to binge it as quickly as possible!" }
  ],
  review: [
    { name: 'Alice', description: 'Great product!', rating: 5 },
    { name: 'Bob', description: 'Not bad', rating: 3 }
  ]
},

{
  id: 4,
  img: '/img/6.jpg',
  title: 'Example Movie Title',
  description: 'This is an example description of the movie. This is an example description of the movie. This is an example description of the movie. This is an example description of the movie. This is an example description of the movie. This is an example description of the movie. This is an example description of the movie. This is an example description of the movie. This is an example description of the movie.',
  rating: 4.5,
  releaseDate: '2023-06-20',
  type: 'Movie',
  episodes: 0,
  duration: '2h 30m',
  genre: ['Action', 'Adventure', 'Adventure', 'Adventure', 'Adventure', 'Adventure'],
  companyName: 'Example Productions',
  role: [
    { img: '/img/6.jpg', name: 'Actor 1', roleType: 'Lead' },
    { img: '/img/7.jpg', name: 'Actor 2', roleType: 'Supporting' },
    { img: '/img/6.jpg', name: 'Actor 1', roleType: 'Lead' },
    { img: '/img/7.jpg', name: 'Actor 2', roleType: 'Supporting' },
    { img: '/img/6.jpg', name: 'Actor 1', roleType: 'Lead' }
  ],
  news: [
    { id:1, title: 'News Title 1 News Title 1 News Title 1 News Title 1 News Title 1 ', description: '"The Boys" stars share which scene the superhero series should be known for and more in our interview with the cast.' },
    { id:2, title: 'News Title 2', description: "There's nothing more that I can really say about The Boys that hasn't already been said. It's just a flat out awesome show! It's easily become one of my favorite new shows in years! I binged the entire first two seasons in just a few days when they first came out and rewatched them again for the second time before Season 3 came out. I was expecting a little bit of a drop off for Season 3 because Season 1 and 2 were so great, and there is a little drop in quality but it's still a very good show! It takes everything you loved about Season 1 and 2 (the violence, humor, heart, craziness, character development, etc.) and takes it all to a whole new level! This show has such an original take on the Superhero genre that is both exciting and hilarious! I can not recommend this show enough! Just a warning though...once you start watching it it's hard to stop. Give yourself enough time because you'll want to binge it as quickly as possible!" }
  ],
  review: [
    { name: 'Alice', description: 'Great product!', rating: 5 },
    { name: 'Bob', description: 'Not bad', rating: 3 }
  ]
},

{
  id: 5,
  img: '/img/7.jpg',
  title: 'Example Movie Title',
  description: 'This is an example description of the movie. This is an example description of the movie. This is an example description of the movie. This is an example description of the movie. This is an example description of the movie. This is an example description of the movie. This is an example description of the movie. This is an example description of the movie. This is an example description of the movie.',
  rating: 4.5,
  releaseDate: '2023-06-20',
  type: 'Movie',
  episodes: 0,
  duration: '2h 30m',
  genre: ['Action', 'Adventure', 'Adventure', 'Adventure', 'Adventure', 'Adventure'],
  companyName: 'Example Productions',
  role: [
    { img: '/img/6.jpg', name: 'Actor 1', roleType: 'Lead' },
    { img: '/img/7.jpg', name: 'Actor 2', roleType: 'Supporting' },
    { img: '/img/6.jpg', name: 'Actor 1', roleType: 'Lead' },
    { img: '/img/7.jpg', name: 'Actor 2', roleType: 'Supporting' },
    { img: '/img/6.jpg', name: 'Actor 1', roleType: 'Lead' }
  ],
  news: [
    { title: 'News Title 1 News Title 1 News Title 1 News Title 1 News Title 1 ', description: '"The Boys" stars share which scene the superhero series should be known for and more in our interview with the cast.' },
    { title: 'News Title 2', description: "There's nothing more that I can really say about The Boys that hasn't already been said. It's just a flat out awesome show! It's easily become one of my favorite new shows in years! I binged the entire first two seasons in just a few days when they first came out and rewatched them again for the second time before Season 3 came out. I was expecting a little bit of a drop off for Season 3 because Season 1 and 2 were so great, and there is a little drop in quality but it's still a very good show! It takes everything you loved about Season 1 and 2 (the violence, humor, heart, craziness, character development, etc.) and takes it all to a whole new level! This show has such an original take on the Superhero genre that is both exciting and hilarious! I can not recommend this show enough! Just a warning though...once you start watching it it's hard to stop. Give yourself enough time because you'll want to binge it as quickly as possible!" }
  ],
  review: [
    { name: 'Alice', description: 'Great product!', rating: 5 },
    { name: 'Bob', description: 'Not bad', rating: 3 }
  ]
},

{
  id: 6,
  img: '/img/8.jpg',
  title: 'Example Movie Title',
  description: 'This is an example description of the movie. This is an example description of the movie. This is an example description of the movie. This is an example description of the movie. This is an example description of the movie. This is an example description of the movie. This is an example description of the movie. This is an example description of the movie. This is an example description of the movie.',
  rating: 4.5,
  releaseDate: '2023-06-20',
  type: 'Movie',
  episodes: 0,
  duration: '2h 30m',
  genre: ['Action', 'Adventure', 'Adventure', 'Adventure', 'Adventure', 'Adventure'],
  companyName: 'Example Productions',
  role: [
    { img: '/img/6.jpg', name: 'Actor 1', roleType: 'Lead' },
    { img: '/img/7.jpg', name: 'Actor 2', roleType: 'Supporting' },
    { img: '/img/6.jpg', name: 'Actor 1', roleType: 'Lead' },
    { img: '/img/7.jpg', name: 'Actor 2', roleType: 'Supporting' },
    { img: '/img/6.jpg', name: 'Actor 1', roleType: 'Lead' }
  ],
  news: [
    { title: 'News Title 1 News Title 1 News Title 1 News Title 1 News Title 1 ', description: '"The Boys" stars share which scene the superhero series should be known for and more in our interview with the cast.' },
    { title: 'News Title 2', description: "There's nothing more that I can really say about The Boys that hasn't already been said. It's just a flat out awesome show! It's easily become one of my favorite new shows in years! I binged the entire first two seasons in just a few days when they first came out and rewatched them again for the second time before Season 3 came out. I was expecting a little bit of a drop off for Season 3 because Season 1 and 2 were so great, and there is a little drop in quality but it's still a very good show! It takes everything you loved about Season 1 and 2 (the violence, humor, heart, craziness, character development, etc.) and takes it all to a whole new level! This show has such an original take on the Superhero genre that is both exciting and hilarious! I can not recommend this show enough! Just a warning though...once you start watching it it's hard to stop. Give yourself enough time because you'll want to binge it as quickly as possible!" }
  ],
  review: [
    { name: 'Alice', description: 'Great product!', rating: 5 },
    { name: 'Bob', description: 'Not bad', rating: 3 }
  ]
},

{
  id: 7,
  img: '/img/9.jpg',
  title: 'Example Movie Title',
  description: 'This is an example description of the movie. This is an example description of the movie. This is an example description of the movie. This is an example description of the movie. This is an example description of the movie. This is an example description of the movie. This is an example description of the movie. This is an example description of the movie. This is an example description of the movie.',
  rating: 4.5,
  releaseDate: '2023-06-20',
  type: 'Movie',
  episodes: 0,
  duration: '2h 30m',
  genre: ['Action', 'Adventure', 'Adventure', 'Adventure', 'Adventure', 'Adventure'],
  companyName: 'Example Productions',
  role: [
    { img: '/img/6.jpg', name: 'Actor 1', roleType: 'Lead' },
    { img: '/img/7.jpg', name: 'Actor 2', roleType: 'Supporting' },
    { img: '/img/6.jpg', name: 'Actor 1', roleType: 'Lead' },
    { img: '/img/7.jpg', name: 'Actor 2', roleType: 'Supporting' },
    { img: '/img/6.jpg', name: 'Actor 1', roleType: 'Lead' }
  ],
  news: [
    { title: 'News Title 1 News Title 1 News Title 1 News Title 1 News Title 1 ', description: '"The Boys" stars share which scene the superhero series should be known for and more in our interview with the cast.' },
    { title: 'News Title 2', description: "There's nothing more that I can really say about The Boys that hasn't already been said. It's just a flat out awesome show! It's easily become one of my favorite new shows in years! I binged the entire first two seasons in just a few days when they first came out and rewatched them again for the second time before Season 3 came out. I was expecting a little bit of a drop off for Season 3 because Season 1 and 2 were so great, and there is a little drop in quality but it's still a very good show! It takes everything you loved about Season 1 and 2 (the violence, humor, heart, craziness, character development, etc.) and takes it all to a whole new level! This show has such an original take on the Superhero genre that is both exciting and hilarious! I can not recommend this show enough! Just a warning though...once you start watching it it's hard to stop. Give yourself enough time because you'll want to binge it as quickly as possible!" }
  ],
  review: [
    { name: 'Alice', description: 'Great product!', rating: 5 },
    { name: 'Bob', description: 'Not bad', rating: 3 }
  ]
},

{
  id: 8,
  img: '/img/10.jpg',
  title: 'Example Movie Title',
  description: 'This is an example description of the movie. This is an example description of the movie. This is an example description of the movie. This is an example description of the movie. This is an example description of the movie. This is an example description of the movie. This is an example description of the movie. This is an example description of the movie. This is an example description of the movie.',
  rating: 4.5,
  releaseDate: '2023-06-20',
  type: 'Movie',
  episodes: 0,
  duration: '2h 30m',
  genre: ['Action', 'Adventure', 'Adventure', 'Adventure', 'Adventure', 'Adventure'],
  companyName: 'Example Productions',
  role: [
    { img: '/img/6.jpg', name: 'Actor 1', roleType: 'Lead' },
    { img: '/img/7.jpg', name: 'Actor 2', roleType: 'Supporting' },
    { img: '/img/6.jpg', name: 'Actor 1', roleType: 'Lead' },
    { img: '/img/7.jpg', name: 'Actor 2', roleType: 'Supporting' },
    { img: '/img/6.jpg', name: 'Actor 1', roleType: 'Lead' }
  ],
  news: [
    { title: 'News Title 1 News Title 1 News Title 1 News Title 1 News Title 1 ', description: '"The Boys" stars share which scene the superhero series should be known for and more in our interview with the cast.' },
    { title: 'News Title 2', description: "There's nothing more that I can really say about The Boys that hasn't already been said. It's just a flat out awesome show! It's easily become one of my favorite new shows in years! I binged the entire first two seasons in just a few days when they first came out and rewatched them again for the second time before Season 3 came out. I was expecting a little bit of a drop off for Season 3 because Season 1 and 2 were so great, and there is a little drop in quality but it's still a very good show! It takes everything you loved about Season 1 and 2 (the violence, humor, heart, craziness, character development, etc.) and takes it all to a whole new level! This show has such an original take on the Superhero genre that is both exciting and hilarious! I can not recommend this show enough! Just a warning though...once you start watching it it's hard to stop. Give yourself enough time because you'll want to binge it as quickly as possible!" }
  ],
  review: [
    { name: 'Alice', description: 'Great product!', rating: 5 },
    { name: 'Bob', description: 'Not bad', rating: 3 }
  ]
}
]);

const [planToWatchMovies] = useState ([ {

      id: 1,
      img: '/img/3.jpg',
      title: 'Example Movie Title',
      description: 'This is an example description of the movie. This is an example description of the movie. This is an example description of the movie. This is an example description of the movie. This is an example description of the movie. This is an example description of the movie. This is an example description of the movie. This is an example description of the movie. This is an example description of the movie.',
      rating: 4.5,
      releaseDate: '2023-06-20',
      type: 'Movie',
      episodes: 0,
      duration: '2h 30m',
      genre: ['Action', 'Adventure', 'Adventure', 'Adventure', 'Adventure', 'Adventure'],
      companyName: 'Example Productions',
      role: [
        { img: '/img/6.jpg', name: 'Actor 1', roleType: 'Lead' },
        { img: '/img/7.jpg', name: 'Actor 2', roleType: 'Supporting' },
        { img: '/img/6.jpg', name: 'Actor 1', roleType: 'Lead' },
        { img: '/img/7.jpg', name: 'Actor 2', roleType: 'Supporting' },
        { img: '/img/6.jpg', name: 'Actor 1', roleType: 'Lead' }
      ],
      news: [
        { title: 'News Title 1 News Title 1 News Title 1 News Title 1 News Title 1 ', description: '"The Boys" stars share which scene the superhero series should be known for and more in our interview with the cast.' },
        { title: 'News Title 2', description: "There's nothing more that I can really say about The Boys that hasn't already been said. It's just a flat out awesome show! It's easily become one of my favorite new shows in years! I binged the entire first two seasons in just a few days when they first came out and rewatched them again for the second time before Season 3 came out. I was expecting a little bit of a drop off for Season 3 because Season 1 and 2 were so great, and there is a little drop in quality but it's still a very good show! It takes everything you loved about Season 1 and 2 (the violence, humor, heart, craziness, character development, etc.) and takes it all to a whole new level! This show has such an original take on the Superhero genre that is both exciting and hilarious! I can not recommend this show enough! Just a warning though...once you start watching it it's hard to stop. Give yourself enough time because you'll want to binge it as quickly as possible!" }
      ],
      review: [
        { name: 'Alice', description: 'Great product!', rating: 5 },
        { name: 'Bob', description: 'Not bad', rating: 3 }
      ]
  }]);

const [watchedMovies] = useState ([ {

      id: 1,
      img: '/img/3.jpg',
      title: 'Example Movie Title',
      description: 'This is an example description of the movie. This is an example description of the movie. This is an example description of the movie. This is an example description of the movie. This is an example description of the movie. This is an example description of the movie. This is an example description of the movie. This is an example description of the movie. This is an example description of the movie.',
      rating: 4.5,
      releaseDate: '2023-06-20',
      type: 'Movie',
      episodes: 0,
      duration: '2h 30m',
      genre: ['Action', 'Adventure', 'Adventure', 'Adventure', 'Adventure', 'Adventure'],
      companyName: 'Example Productions',
      role: [
        { img: '/img/6.jpg', name: 'Actor 1', roleType: 'Lead' },
        { img: '/img/7.jpg', name: 'Actor 2', roleType: 'Supporting' },
        { img: '/img/6.jpg', name: 'Actor 1', roleType: 'Lead' },
        { img: '/img/7.jpg', name: 'Actor 2', roleType: 'Supporting' },
        { img: '/img/6.jpg', name: 'Actor 1', roleType: 'Lead' }
      ],
      news: [
        { title: 'News Title 1 News Title 1 News Title 1 News Title 1 News Title 1 ', description: '"The Boys" stars share which scene the superhero series should be known for and more in our interview with the cast.' },
        { title: 'News Title 2', description: "There's nothing more that I can really say about The Boys that hasn't already been said. It's just a flat out awesome show! It's easily become one of my favorite new shows in years! I binged the entire first two seasons in just a few days when they first came out and rewatched them again for the second time before Season 3 came out. I was expecting a little bit of a drop off for Season 3 because Season 1 and 2 were so great, and there is a little drop in quality but it's still a very good show! It takes everything you loved about Season 1 and 2 (the violence, humor, heart, craziness, character development, etc.) and takes it all to a whole new level! This show has such an original take on the Superhero genre that is both exciting and hilarious! I can not recommend this show enough! Just a warning though...once you start watching it it's hard to stop. Give yourself enough time because you'll want to binge it as quickly as possible!" }
      ],
      review: [
        { name: 'Alice', description: 'Great product!', rating: 5 },
        { name: 'Bob', description: 'Not bad', rating: 3 }
      ]
  }]);








  const [cartItems, setCartItems] = useState([]);

  const handleCancelItem = (id) => {
  setCartItems(cartItems.filter(item => item.id !== id));
  };

  const handleAddToCart = (product) => {
    alert('Item added to cart!');
    setCartItems([...cartItems, product]);
  };

  const handleConfirmOrder = () => {
    alert('Order confirmed!');
    setCartItems([]);
  };







  return (
    <Router>
      <ScrollToTop />
      <div className="container">
      {/* <Navbar /> */}
        <Routes>
        <Route path="/" element={<Login />} />
          <Route element={<Layout />}>
              <Route path="/home" element={<Home movies={movies}/>} />
              <Route path="/search" element={<Search movies={movies}/>} />
              <Route path="/discussion" element={<Discussion />} />
              <Route path="/mylist" element={<Mylist planToWatchMovies={planToWatchMovies} watchedMovies={watchedMovies}/>} />
              {/* <Route path="/merch" element={<Merch products={products} />} /> */}
              <Route path="/profile" element={<Profile />} />
              <Route path="/merch/cart" element={<Cart cartItems={cartItems} onConfirmOrder={handleConfirmOrder} onCancelItem={handleCancelItem} />} />
              <Route path="/merch" element={<ProductSection products={products} />} />
              <Route path="/product/:productId" element={<ProductDetails products={products} onAddToCart={handleAddToCart} />} />
              <Route path="/media/:mediaID" element={<MovieDetailsPage movies={movies} />} />


              <Route path="/company" element={<CompanySection companies={companies} />} />
              <Route path="/company/:companyID" element={<CompanyDetailsPage companies={companies} products={products} />} />

              {/* /:movieId */}
          </Route>
        </Routes>
      </div>
    </Router>
  );

}
