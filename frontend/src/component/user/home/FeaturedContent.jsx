import React, { useState, useEffect } from 'react';
import './FeaturedContent.css';
import { Link } from 'react-router-dom';

function FeaturedContent() {
  const [featuredItems, setFeaturedItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  

  // Helper function to truncate text
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }
    return text;
  };

  // Fetch featured items from the backend
  const fetchFeaturedItems = async () => {
    try {
      const response = await fetch('http://localhost:5000/media/featured', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch featured content');
      }

      const data = await response.json();
      const transformedData = data.map((item) => ({
        id: item.id, // Make sure to include the id here
        title: item.title,
        imgSrc: item.imgSrc,
        description: item.description,
      }));

      setFeaturedItems(transformedData);
      // console.log('^^^^^^^^^^^^Featured items:', transformedData);

    } catch (err) {
      console.error('Failed to fetch featured content:', err);
      setFeaturedItems([]); // Handle the error by setting to an empty array
    }
  };

  // Fetch data only once when the component mounts
  useEffect(() => {
    fetchFeaturedItems();
  }, []);

  // Set up the interval for changing featured items
  useEffect(() => {
    if (featuredItems.length === 0) return; // Don't set an interval if there are no featured items

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredItems.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [featuredItems]); // Depend on the featuredItems array to set up the interval after it is fetched

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  const username = localStorage.getItem('username') || '';

  return (
    <div
      className="featured-content"
      style={{
        backgroundImage:
          featuredItems.length
            ? `linear-gradient(to bottom, rgba(0,0,0,0), #242428), url(${featuredItems[currentIndex].imgSrc})`
            : 'none',
      }}
    >
      {featuredItems.length > 0 ? (
        <>
          <div className="allsection2">
            <div className="section12">
              <img src={featuredItems[currentIndex].imgSrc} alt={featuredItems[currentIndex].title} className="movie-img" />
            </div>
            <div className="section22">
              <h1 className="featured-title">{featuredItems[currentIndex].title}</h1>
              <p className="featured-desc">
                {truncateText(featuredItems[currentIndex].description, 250)}
              </p>
              <button className="featured-button">
                <Link to={`/${username}/media/${featuredItems[currentIndex].id}`} className="featured-link">
                  View Details
                </Link>
              </button>
            </div>
          </div>
          <div className="dots-container">
            {featuredItems.map((_, index) => (
              <span
                key={index}
                className={`dot ${index === currentIndex ? 'active' : ''}`}
                onClick={() => handleDotClick(index)}
              ></span>
            ))}
          </div>
        </>
      ) : (
        <p>Loading featured content...</p>
      )}
    </div>
  );
}

export default FeaturedContent;
