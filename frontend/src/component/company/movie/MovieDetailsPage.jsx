import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import RoleCard from "./RoleCard";
import NewsCard from "./NewsCard";
import "./MovieDetailsPage.css";
import ReactPlayer from "react-player";
import ProductCard from "./ProductCard";
import StarRatings from "react-star-ratings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faStarHalfAlt,
  faStar as faStarEmpty,
} from "@fortawesome/free-solid-svg-icons";

const StarIcon = ({
  filled,
  size = 24,
  color = "#ff640a",
  strokeColor = "#ffffff",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height={size}
    viewBox="0 0 24 24"
    width={size}
    fill={filled ? color : "none"} // Fill only if star is filled
    stroke={filled ? color : strokeColor} // Stroke color changes based on filled state
    strokeWidth={2} // Increase stroke width for a thicker edge
    strokeLinecap="round"
    //   strokeLinejoin="round"
    style={{ marginRight: "5px" }} // Adjust spacing between stars
  >
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

const ReviewCard = ({ review }) => {
  return (
    <div className="review-card111">
      <i class="fa-regular fa-circle-user"></i>
      <div>
        <h4 className="review-name111">{review.name}</h4>
        <p className="review-desc111">{review.description}</p>
        {/* <p className="review-rating">Rating: {review.rating}/10</p> */}
        <div style={{ display: "flex", alignItems: "center" }}>
          {Array.from({ length: 5 }, (_, index) => {
            const starValue = index + 1;
            return (
              <StarIcon
                key={index}
                filled={review.rating / 2 >= starValue}
                size={13} // Adjust this for star size
                color="#ff640a"
              />
            );
          })}
          <p className="review-rating111">
            {" "}
            Review Rating: <strong>{(review.rating / 2).toFixed(1)} </strong>
          </p>
        </div>
      </div>
    </div>
  );
};

const MovieDetailsPage = () => {
  const { mediaID } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [products, setProducts] = useState([]);
  const [newNews, setNewNews] = useState({ topic: '', description: '' });


  const userId = localStorage.getItem("user_id");

  //movie details--------------------------------------------------------------------------
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch("http://localhost:5000/media/page", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: mediaID }),
        });
        if (!response.ok) {
          throw new Error("Failed to fetch movie page");
        }
        const movieDetails = await response.json();
        setMovieDetails(movieDetails);
        console.log(movieDetails);
      } catch (err) {
        console.error("Failed to fetch movie page:", err);
      }
    };
    fetchMovieDetails();
  }, [mediaID]);

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response = await fetch("http://localhost:5000/media/review", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: mediaID }),
        });
        if (!response.ok) {
          throw new Error("Failed to fetch movie reviews");
        }
        const movieReviews = await response.json();
        setReviews(movieReviews);
      } catch (err) {
        console.error("Failed to fetch movie reviews:", err);
      }
    };
    fetchReview();
  }, [mediaID]);

  useEffect(() => {
    const fetchproducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/media/products", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ media_id: mediaID }),
        });
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          console.error("Failed to fetch company data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchproducts();
  }, [mediaID]);


  

  const handleAddNews = async () => {
    if (newNews.topic && newNews.description) {
        try {
            const response = await fetch('http://localhost:5000/addNews', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    mediaID,
                    com_id: localStorage.getItem('user_id'),
                    topic: newNews.topic,
                    description: newNews.description
                })
            });
            if (!response.ok) {
                throw new Error('Failed to add news');
            }
            setMovieDetails(prevState => ({
                ...prevState,
                news: [...prevState.news, { 
                    topic: newNews.topic,
                    description: newNews.description,
                    date: new Date().toISOString().split('T')[0] // Adding the current date
                }]
            }));
            setNewNews({ topic: '', description: '' });
        } catch (err) {
            console.error('Failed to add news:', err);
        }
    } else {
        alert('Please fill out both topic and description.');
    }
};



  if (!movieDetails) {
    return <div className="error">Loading...</div>;
  }

  const coverImgStyle = {
    backgroundImage: `url(${movieDetails.img})`,
    backgroundAttachment: "fixed",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "100%",
    height: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const StarIcon = ({
    filled,
    size = 24,
    color = "#ff640a",
    strokeColor = "#ffffff",
  }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={size}
      viewBox="0 0 24 24"
      width={size}
      fill={filled ? color : "none"} // Fill only if star is filled
      stroke={filled ? color : strokeColor} // Stroke color changes based on filled state
      strokeWidth={2} // Increase stroke width for a thicker edge
      strokeLinecap="round"
      //   strokeLinejoin="round"
      style={{ marginRight: "5px" }} // Adjust spacing between stars
    >
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  );

  return (
    <div className="movie-details-page1">
      <div className="movie-details" style={coverImgStyle}>
        <div className="top-section">
          <img
            src={movieDetails.img}
            alt={movieDetails.title}
            className="movie-img"
          />
        </div>
      </div>

      <div className="allsection1">
        <div className="allsection1-section1">
          <h2 className="allsection1-section1-title">{movieDetails.title}</h2>

          <p className="allsection1-section1-type">
            {movieDetails.episodes} ⬥ {movieDetails.type}
          </p>

          <div style={{ display: "flex", alignItems: "center" }}>
            {Array.from({ length: 5 }, (_, index) => {
              const starValue = index + 1;
              return (
                <StarIcon
                  key={index}
                  filled={movieDetails.rating / 2 >= starValue}
                  size={21} // Adjust this for star size
                  color="#ff640a"
                />
              );
            })}
            <p className="allsection1-section1-avg">
              {" "}
              Average Rating:{" "}
              <strong>{(movieDetails.rating / 2).toFixed(1)} </strong>
            </p>
          </div>

          <p className="allsection1-section1-desc">
            {movieDetails.description}
          </p>

          <p className="genre-box1">
            {movieDetails.genre.map((item, index) => (
              <span key={index} className="genre-item-box1">
                {item}
              </span>
            ))}
          </p>
          <p className="allsection1-section1-epi">
            <div>Episodes</div>
            <div>
              {movieDetails.episodes === 0 ? "Movie" : movieDetails.episodes}
            </div>
          </p>
          <p className="allsection1-section1-epi">
            <div>Duration</div> {movieDetails.duration}
          </p>
          <p className="allsection1-section1-epi">
            <div>Release Date</div> {movieDetails.releaseDate}
          </p>
          <p className="allsection1-section1-epi">
            <div>Company</div> {movieDetails.companyName}
          </p>
        </div>

        <div className="allsection1-section2">
          <div className="trailer-box">
            <ReactPlayer
              url={movieDetails.trailer}
              className="trailer-player1"
            />
            <div
              className="allsection1-section2-button"
              onClick={() => window.open(movieDetails.trailer, "_blank")}
              style={{ cursor: "pointer" }}
            >
              <i className="fa-brands fa-google-play"></i> WATCH TRAILER
            </div>
          </div>
        </div>
      </div>

      {/* Roles , Review Section */}
      <div className="movie-details-middle1">
        <div className="movie-details-middle1-left">
          {/* Roles Section */}
          <div className="roles-section111">
            <h3>Top Cast</h3>
            <div className="roles-list111">
              {movieDetails.role.length > 0 ? (
                movieDetails.role.map((role, index) => (
                  <RoleCard key={index} role={role} />
                ))
              ) : (
                <p style={{ marginLeft: "20px", color: "white" }}>
                  No role is assigned.
                </p>
              )}
            </div>
          </div>
          {/* Reviews Section */}
          <div className="reviews-section111">
            <h3 className="review-rating-title111">Reviews & Rating</h3>
            <div className="review-rating-all111">
              {reviews.length > 0 ? (
                reviews.map((review, index) => (
                  <ReviewCard key={index} review={review} />
                ))
              ) : (
                <p style={{ marginLeft: "20px", color: "white" }}>
                  No review is given yet!
                </p>
              )}
            </div>
          </div>
        </div>

        {/* News & Advertisement Section */}
        <div className="movie-details-middle1-right">
          <div className="news-section1111">
            <h3>News & Updates</h3>
            <div className="news-list">
              {movieDetails.news.length > 0 ? (
                movieDetails.news.map((newsItem, index) => (
                  <NewsCard key={index} news={newsItem} />
                ))
              ) : (
                <p style={{ marginLeft: "20px", color: "white" }}>
                  No news available for this movie.
                </p>
              )}
            </div>
            <div className="add-news">
              <h4 style={{ color: "white" }}>Add a News</h4>
              <input
                type="text"
                placeholder="Headline"
                value={newNews.topic}
                onChange={(e) =>
                  setNewNews({ ...newNews, topic: e.target.value })
                }
                className="news-name"
              />
              <textarea
                placeholder="News Description"
                value={newNews.description}
                onChange={(e) =>
                  setNewNews({ ...newNews, description: e.target.value })
                }
                className="news-des"
              />
              <button onClick={handleAddNews}>Submit</button>
            </div>
          </div>

          {/*Advertisement Section */}
          <div className="company-details-middle111">
            <div className="products-section1111">
              <h3 className="products-title1111">Advertisement</h3>
              <div className="product-list1111">
                {products.length > 0 ? (
                  products.map((product) => (
                    <ProductCard key={product.PRO_ID} product={product} />
                  ))
                ) : (
                  <p style={{ marginLeft: "20px", color: "white" }}>
                    No products available at the moment.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
