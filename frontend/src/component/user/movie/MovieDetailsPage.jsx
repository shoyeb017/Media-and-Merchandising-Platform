import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import RoleCard from "./RoleCard";
import NewsCard from "./NewsCard";
import "./MovieDetailsPage.css";
import ReactPlayer from "react-player";
import ProductCard from "../merch/ProductCard";
import StarRatings from "react-star-ratings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faStarHalfAlt,
  faStar as faStarEmpty,
} from "@fortawesome/free-solid-svg-icons";
import dis4 from "./dis5.png";

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

const DiscussionCard = ({ discussion }) => {
const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

return (
    <div className="discussion-card111">
        <h4 className="discussion-topic">{discussion.TOPIC}</h4>
        <p style={{ color: '#ff640a', fontSize: '10px' }}>{formatDate(discussion.DIS_DATE)}</p>
        <p className="discussion-desc">{discussion.DESCRIPTION}</p>
    </div>
);
};

const MovieDetailsPage = () => {
  const { mediaID } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [watchedList, setWatchedList] = useState([]);
  const [planToWatchList, setPlanToWatchList] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    name: "",
    description: "",
    rating: 0,
  });
  const [newDiscussion, setNewDiscussion] = useState({
    topic: "",
    description: "",
  });
  const [discussions, setDiscussions] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [products, setProducts] = useState([]);

  const userId = localStorage.getItem("user_id");

  // isfavorite------------------------------------------------------------------------------------------

  useEffect(() => {
    const fetchFavorite = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/media/favorite/status",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ user_id: userId, media_id: mediaID }),
          }
        );
        if (response.status === 200) {
          setIsFavorite(true);
        } else {
          setIsFavorite(false);
        }
        console.log(isFavorite);
      } catch (error) {
        console.error("Error fetching favorite status:", error);
      }
    };
    fetchFavorite();
  }, [userId, mediaID]);

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
          throw new Error("Failed to fetch movie DISCUSSION");
        }
        const movieDetails = await response.json();
        setMovieDetails(movieDetails);
        console.log(movieDetails);
      } catch (err) {
        console.error("Failed to fetch movie Discussion:", err);
      }
    };
    fetchMovieDetails();
  }, [mediaID]);

  /// discussion-------------------------------------------------------------------------------------

  useEffect(() => {
    const fetchMovieDis = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/discussions/media",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: mediaID }),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch movie details");
        }
        const movieDetails = await response.json();
        setDiscussions(movieDetails);
      } catch (err) {
        console.error("Failed to fetch movie details:", err);
      }
    };
    fetchMovieDis();
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

  if (!movieDetails) {
    return <div className="error">Loading...</div>;
  }

  const handleWatched = async () => {
    alert("Movie added to Watched List");
    setWatchedList([...watchedList, movieDetails]);
    setPlanToWatchList(
      planToWatchList.filter((item) => item.title !== movieDetails.title)
    );

    try {
      await fetch("http://localhost:5000/media/mylist/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
          media_id: movieDetails.id,
          status: "WATCHED",
        }),
      });
    } catch (error) {
      console.error("Error updating eatched list:", error);
    }
  };

  const handlePlanToWatch = async () => {
    alert("Movie added to Plan to Watch List");
    setPlanToWatchList([...planToWatchList, movieDetails]);
    setWatchedList(
      watchedList.filter((item) => item.title !== movieDetails.title)
    );

    try {
      await fetch("http://localhost:5000/media/mylist/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
          media_id: movieDetails.id,
          status: "PLAN_TO_WATCH",
        }),
      });
    } catch (error) {
      console.error("Error updating plan to watch list:", error);
    }
  };

  const updateReview = async () => {
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

  const handleAddReview = async () => {
    if (!newReview.description || newReview.rating <= 0) {
      alert("Please fill out all fields and provide a rating.");
      return;
    }

    try {
      const addResponse = await fetch(
        "http://localhost:5000/media/review/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: userId,
            media_id: movieDetails.id,
            description: newReview.description,
            rating: newReview.rating,
          }),
        }
      );

      if (!addResponse.ok) {
        throw new Error("Failed to add review");
      }

      setNewReview({ name: "", description: "", rating: 0 });

      await updateReview();
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };
  ``;

  const handleAddDiscussion = async () => {
    if (newDiscussion.topic && newDiscussion.description) {
      setDiscussions([...discussions, newDiscussion]);
      setNewDiscussion({ topic: "", description: "" });
    } else {
      alert("Please fill out both topic and description.");
    }

    try {
      await fetch("http://localhost:5000/discussions/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
          media_id: movieDetails.id,
          topic: newDiscussion.topic,
          description: newDiscussion.description,
        }),
      });
    } catch (error) {
      console.error("Error adding discussion:", error);
    }
    const fetchMovieDis = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/discussions/media",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: mediaID }),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch movie details");
        }
        const movieDetails = await response.json();
        setDiscussions(movieDetails);
      } catch (err) {
        console.error("Failed to fetch movie details:", err);
      }
    };
    fetchMovieDis();
  };

  const handleFavorite = async () => {
    setIsFavorite(!isFavorite);
    try {
      await fetch("http://localhost:5000/media/favorite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
          media_id: movieDetails.id,
          is_favorite: !isFavorite,
        }),
      });
    } catch (error) {
      console.error("Error updating favorite status:", error);
    }
  };

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
          <h2 className="allsection1-section1-title">
            {movieDetails.title}
            <i
              className={`fa-regular fa-heart fav-icon ${
                isFavorite ? "favorite" : ""
              }`}
              onClick={handleFavorite}
            ></i>
            {/* <FontAwesomeIcon
                            icon={faHeart}
                            className={`fav-icon ${isFavorite ? 'favorite' : ''}`}
                            onClick={handleFavorite}
                        /> */}
          </h2>

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

          <div className="allsection1-section1-watchlist-buttons">
          <button
              className="allsection1-section1-watchlist-button1"
              onClick={handlePlanToWatch}
            >
              <i class="fa-solid fa-plus"></i> ADD TO PLAN TO WATCH
            </button>
            <button
              className="allsection1-section1-watchlist-button2"
              onClick={handleWatched}
            >
              {" "}
              <i class="fa-regular fa-bookmark"></i> ADD TO WATCHLIST
            </button>
            
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
            <div>{movieDetails.episodes === 0 ? 'Movie' : movieDetails.episodes}</div>
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
              onClick={() => window.open(movieDetails.trailer, '_blank')}
              style={{ cursor: 'pointer' }}
            >
              <i className="fa-brands fa-google-play"></i> WATCH TRAILER
            </div>

          </div>
        </div>
      </div>

      {/* Roles , Review , Discussion Section */}
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
                  No review is given yet. Be the first one!
                </p>
              )}
            </div>
            <div className="add-review111">
              <p style={{ color: "white" }}>Add a Review</p>
              <div className="rating-review-box111">
                <textarea
                  placeholder="Your Review"
                  value={newReview.description}
                  onChange={(e) =>
                    setNewReview({ ...newReview, description: e.target.value })
                  }
                />
                <select
                  value={newReview.rating}
                  onChange={(e) =>
                    setNewReview({
                      ...newReview,
                      rating: parseInt(e.target.value),
                    })
                  }
                >
                  <option value={0}>0</option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                  <option value={6}>6</option>
                  <option value={7}>7</option>
                  <option value={8}>8</option>
                  <option value={9}>9</option>
                  <option value={10}>10</option>
                </select>
              </div>
              <button onClick={handleAddReview}>Submit</button>
            </div>
          </div>
          {/* Discussions Section */}
          <div className="discussions-section">
            <div className="discussions-section-inner">
              <h3 className="discussion-title">Discussions</h3>
              {discussions.length > 0 ? (
                discussions.map((discussion, index) => (
                  <DiscussionCard key={index} discussion={discussion} />
                ))
              ) : (
                <p style={{ marginLeft: "20px", color: "white" }}>
                  No discussions available yet. Be the first to start a
                  discussion!
                </p>
              )}

              <div className="add-discussion">
                <p style={{ color: "white" }}>Add a Discussion</p>
                <input
                  type="text"
                  placeholder="Topic"
                  value={newDiscussion.topic}
                  onChange={(e) =>
                    setNewDiscussion({
                      ...newDiscussion,
                      topic: e.target.value,
                    })
                  }
                  className="discussion-name"
                />
                <textarea
                  placeholder="Discussion Description"
                  value={newDiscussion.description}
                  onChange={(e) =>
                    setNewDiscussion({
                      ...newDiscussion,
                      description: e.target.value,
                    })
                  }
                  className="discussion-des"
                />
                <button onClick={handleAddDiscussion}>Submit</button>
              </div>
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
