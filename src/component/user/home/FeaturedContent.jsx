import React, { useState, useEffect } from 'react';
import './FeaturedContent.css';

const featuredItems = [
  {
    title: 'The Witcher',
    imgSrc: 'img/f-1.jpg',
    description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto illo dolor deserunt nam assumenda ipsa eligendi dolore, ipsum id fugiat quo enim impedit, laboriosam omnis minima voluptatibus incidunt. Accusamus, provident.'
  },
  {
    title: 'The Mandalorian',
    imgSrc: 'img/f-2.jpg',
    description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto illo dolor deserunt nam assumenda ipsa eligendi dolore, ipsum id fugiat quo enim impedit, laboriosam omnis minima voluptatibus incidunt. Accusamus, provident.'
  },
  {
    title: 'Witcher',
    imgSrc: 'img/3.jpg',
    description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto illo dolor deserunt nam assumenda ipsa eligendi dolore, ipsum id fugiat quo enim impedit, laboriosam omnis minima voluptatibus incidunt. Accusamus, provident.'
  },
  {
    title: 'Mandalorian',
    imgSrc: 'img/4.jpg',
    description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto illo dolor deserunt nam assumenda ipsa eligendi dolore, ipsum id fugiat quo enim impedit, laboriosam omnis minima voluptatibus incidunt. Accusamus, provident.'
  },
  {
    title: 'The Witc',
    imgSrc: 'img/5.jpg',
    description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto illo dolor deserunt nam assumenda ipsa eligendi dolore, ipsum id fugiat quo enim impedit, laboriosam omnis minima voluptatibus incidunt. Accusamus, provident.'
  }
];

function FeaturedContent() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredItems.length);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="featured-content" style={{ backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0), #242428), url(${featuredItems[currentIndex].imgSrc})` }}>
      <h1 className="featured-title">{featuredItems[currentIndex].title}</h1>
      <p className="featured-desc">
        {featuredItems[currentIndex].description}
      </p>
      <button className="featured-button">WATCH</button>
      <div className="dots-container">
        {featuredItems.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => handleDotClick(index)}
          ></span>
        ))}
      </div>
    </div>
  );
}

export default FeaturedContent;
