import React, { useState, useEffect } from "react";
import "./FeaturedContent.css";
import { Link } from "react-router-dom";

function FeaturedContent() {
  const [featuredItems, setFeaturedItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false); // State for hover
  const [isHovered1, setIsHovered1] = useState(false);

  // Helper function to truncate text
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  const mediaIds = ["57", "88", "13", "76", "16"];

  // Fetch featured items from the backend
  const fetchFeaturedItems = async () => {
    try {
      const response = await fetch("http://localhost:5000/media/featured1", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mediaIds }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch featured content");
      }

      const data = await response.json();
      setFeaturedItems(data);
      console.log("Featured items:", data);
    } catch (err) {
      console.error("Failed to fetch featured content:", err);
      setFeaturedItems([]); // Handle the error by setting to an empty array
    }
  };

  // Fetch featured items from the backend
  // const fetchFeaturedItems = async () => {
  //   try {
  //     const response = await fetch('http://localhost:5000/media/featured', {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     });

  //     if (!response.ok) {
  //       throw new Error('Failed to fetch featured content');
  //     }

  //     const data = await response.json();
  //     const transformedData = data.map((item) => ({
  //       id: item.id, // Make sure to include the id here
  //       title: item.title,
  //       imgSrc: item.imgSrc,
  //       description: item.description,
  //     }));

  //     setFeaturedItems(transformedData);
  //     // console.log('^^^^^^^^^^^^Featured items:', transformedData);

  //   } catch (err) {
  //     console.error('Failed to fetch featured content:', err);
  //     setFeaturedItems([]); // Handle the error by setting to an empty array
  //   }
  // };

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

  const username = localStorage.getItem("username") || "";

  return (
    <div
      className="featured-content"
      // style={{
      //   backgroundImage:
      //     featuredItems.length
      //       ? `linear-gradient(to left, rgba(0,0,0,0), #000000),
      //          linear-gradient(to bottom, rgba(0,0,0,0), #000000),
      //          url(${featuredItems[currentIndex].poster})`
      //       : 'none',
      //   marginLeft: '0px'
      // }}
    >
      {featuredItems.length > 0 ? (
        <>
          <div className="allsection2">
            <div className="section12">
              <img
                src={featuredItems[currentIndex].poster}
                alt={featuredItems[currentIndex].title}
                className="movie-img"
              />
            </div>
            <div className="section22">
              <h1 className="featured-title">
                {featuredItems[currentIndex].title}
              </h1>
              <p className="featured-details">
                {featuredItems[currentIndex].type} &#9670;{" "}
                {featuredItems[currentIndex].genre}
              </p>
              <p className="featured-desc">
                {truncateText(featuredItems[currentIndex].description, 250)}
              </p>
              <div
                className="tooltip-container"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <Link
                  to={`/${username}/media/${featuredItems[currentIndex].id}`}
                  className="featured-link"
                >
                  <button className="featured-button1">
                    <i className="fa fa-bars"></i> VIEW DETAILS
                  </button>
                </Link>
                {isHovered && <div className="tooltip">View Details</div>}
              </div>

              <div
                className="tooltip-container"
                onMouseEnter={() => setIsHovered1(true)}
                onMouseLeave={() => setIsHovered1(false)}
              >
                <Link
                  to={`/${username}/media/${featuredItems[currentIndex].id}`}
                  className="featured-link"
                >
                  <button className="featured-button2">
                    <i className="fa fa-bookmark"></i>
                  </button>
                </Link>
                {isHovered1 && <div className="tooltip">Add to WatchList</div>}
              </div>
            </div>
          </div>
          <div className="dots-container">
            {featuredItems.map((_, index) => (
              <span
                key={index}
                className={`dot ${index === currentIndex ? "active" : ""}`}
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
