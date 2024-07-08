import React, { useState , useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './component/user/common/Navbar';
import ScrollToTop from './component/user/common/ScrollToTop.jsx';
import Search from './component/user/search/Search.jsx';
import HomeUser from './component/user/home/Home.jsx';
import Discussion from './component/user/discussion/Discussion.jsx';
import Mylist from './component/user/mylist/Mylist.jsx';
import Merch from './component/user/merch/Merch.jsx';
import ProfileUser from './component/user/profile/ProfilePage.jsx';
import Cart from './component/user/merch/Cart.jsx';
import ProductSection from './component/user/merch/ProductSection.jsx';
import ProductDetails from './component/user/merch/ProductDetails.jsx';
import MovieDetailsPage from './component/user/movie/MovieDetailsPage.jsx';
import CompanySection from './component/user/company/CompanySection.jsx';
import CompanyDetailsPage from './component/user/company/CompanyDetailsPage.jsx';
import Login from './component/Login.jsx';
import Registration from './component/Registration.jsx';
//dsahuihajsdlaks
import LayoutUser from './component/LayoutUser.jsx';
import LayoutAdmin from './component/LayoutAdmin.jsx';
import LayoutCompany from './component/LayoutCompany.jsx';
import LayoutMerch from './component/LayoutMerch.jsx';

import HomeAdmin from './component/admin/home/Home.jsx';
import ProfileAdmin from './component/admin/profile/ProfilePage.jsx';

import HomeCompany from './component/company/home/Home.jsx';
import ProfileCompany from './component/company/profile/ProfilePage.jsx';

import HomeMerch from './component/merch/home/Home.jsx';
import ProfileMerch from './component/merch/profile/ProfilePage.jsx';


import './App.css';




export default function App() {


const [products] = useState
([
    {
      id: 1,
      name: 'Product 1 Product 1 Product 1 Product 1',
      price: 29.99,
      img: '/img/3.jpg',
      description: 'This is the description for Product 1.This is the description for Product 1.This is the description for Product 1.This is the description for Product 1.This is the description for Product 1. This is the description for Product 1 This is the description for Product 1 This is the description for Product 1 This is the description for Product 1',
      reviews: [
        { name: 'Alice', description: 'Great product!', rating: 5 },
        { name: 'Bob', description: 'Not bad', rating: 3 }
      ]
    },
    {
      id: 2,
      name: 'Product 2',
      price: 49.99,
      img: '/img/4.jpg',
      description: 'This is the description for Product 2.',
      reviews: [
        { name: 'Charlie', description: 'Loved it!', rating: 4 }
      ]
    },
    {
      id: 3,
      name: 'Product 3',
      price: 19.99,
      img: '/img/5.jpg',
      description: 'This is the description for Product 3.',
      reviews: []
    },

    {
      id: 4,
      name: 'Product 4',
      price: 19.99,
      img: '/img/6.jpg',
      description: 'This is the description for Product 3.',
      reviews: []
    },

    {
      id: 5,
      name: 'Product 5',
      price: 19.99,
      img: '/img/5.jpg',
      description: 'This is the description for Product 3.',
      reviews: []
    },

    {
      id: 6,
      name: 'Product 6',
      price: 19.99,
      img: '/img/5.jpg',
      description: 'This is the description for Product 3.',
      reviews: []
    },

    {
      id: 8,
      name: 'Product 6',
      price: 19.99,
      img: '/img/5.jpg',
      description: 'This is the description for Product 3.',
      reviews: []
    },

    {
      id: 9,
      name: 'Product 6',
      price: 19.99,
      img: '/img/5.jpg',
      description: 'This is the description for Product 3.',
      reviews: []
    },

    {
      id: 10,
      name: 'Product 6',
      price: 19.99,
      img: '/img/5.jpg',
      description: 'This is the description for Product 3.',
      reviews: []
    }
]);


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
  }]);



const [companies] = useState([{
      id: 1,
      name: 'Example Productions',
      img:'/img/4.jpg',
      email:'s@gmail.com',
      description: 'Example Productions is a leading film and TV production company known for its blockbuster movies and popular TV shows.',
      mediaId: [1, 2],
      news: [{ id: 1, title: 'Example Productions Acquires New Script', description: 'Example Productions has acquired the script for a new action-packed movie set to release next summer.'},
             {id: 2, title: 'New TV Show from Example Productions', description: 'Example Productions announces a new TV show that will premiere this fall, featuring an all-star cast.'}
            ],

      productId: [1, 2, 3,4,5,6,7]
    },
    {
      id: 2,
      name: 'DreamWorks Animation',
      img:'/img/4.jpg',
      email:'s@gmail.com',
      description: 'DreamWorks Animation is an American animation studio that creates animated feature films, television programs, and online virtual games.',
      mediaId: [3, 4],
      news: [{id: 1,title: 'DreamWorks Releases New Animated Feature',description: 'DreamWorks Animation has released a new animated feature that is receiving rave reviews from critics and audiences alike.'},
             {id: 2,title: 'DreamWorks Partners with New Streaming Service',description: 'DreamWorks Animation has announced a new partnership with a leading streaming service to bring its animated movies and TV shows to a wider audience.'}
            ],
      productId: [6, 7, 8]
    }
  ]);




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

  const [userType, setUserType] = useState(null);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const storedUserType = localStorage.getItem('userType');
    const storedUsername = localStorage.getItem('username');
    if (storedUserType && storedUsername) {
      setUserType(storedUserType);
      setUsername(storedUsername);
    }
  }, []);


  

  return (
    <Router>
      <ScrollToTop />
      <div className="container">
      {/* <Navbar /> */}
        <Routes>
        <Route path="/" element={<Login setUserType={setUserType} />} />
        <Route path="/registration" element={<Registration />} />
        
          {/* Protected routes based on user type */}
          {userType === 'user' && (
            <Route element={<LayoutUser />}> 
              {/* User-specific routes */}
              <Route path="/:username/home" element={<HomeUser movies={movies}/>} />
              <Route path="/:username/search" element={<Search movies={movies}/>} />
              <Route path="/:username/discussion" element={<Discussion />} />
              <Route path="/:username/mylist" element={<Mylist planToWatchMovies={planToWatchMovies} watchedMovies={watchedMovies}/>} />
              {/* <Route path="/:username/merch" element={<Merch products={products} />} /> */}
              <Route path="/:username/profile" element={<ProfileUser />} />
              <Route path="/:username/merch/cart" element={<Cart cartItems={cartItems} onConfirmOrder={handleConfirmOrder} onCancelItem={handleCancelItem} />} />
              <Route path="/:username/merch" element={<ProductSection products={products} />} />
              <Route path="/:username/product/:productId" element={<ProductDetails products={products} onAddToCart={handleAddToCart} />} />
              <Route path="/:username/media/:mediaID" element={<MovieDetailsPage movies={movies} />} />


              <Route path="/:username/company" element={<CompanySection companies={companies} />} />
              <Route path="/:username/company/:companyID" element={<CompanyDetailsPage companies={companies} products={products} />} />

              {/* /:movieId */}
          </Route>
           )}

           {userType === 'admin' && (
             <Route element={<LayoutAdmin />}>

             <Route path="/:username/home" element={<HomeAdmin movies={movies}/>} />
             <Route path="/:username/profile" element={<ProfileAdmin />} />

             </Route>
           )}

           {userType === 'merchandiser' && (
             <Route element={<LayoutMerch />}>

             <Route path="/:username/home" element={<HomeMerch movies={movies}/>} />
              <Route path="/:username/profile" element={<ProfileMerch />} />

             </Route>
           )}

           {userType === 'company' && (
             <Route element={<LayoutCompany />}>

             <Route path="/:username/home" element={<HomeCompany movies={movies}/>} />
              <Route path="/:username/profile" element={<ProfileCompany />} />

             </Route>
           )}
           {/* Fallback route if userType is not set */}
           <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </div>
    </Router>
  );

}
