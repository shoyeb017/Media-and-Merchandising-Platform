import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import RoleCard from './RoleCard';
import NewsCard from './NewsCard';
import './MovieDetailsPage.css';

const ReviewCard = ({ review }) => {
    return (
      <div className="review-card">
        <h4 className="review-name">{review.name}</h4>
        <p className="review-desc">{review.description}</p>
        <p className="review-rating">Rating: {review.rating}/5</p>
      </div>
    );
  };

  const MovieDetailsPage = ({ movies }) => {
    const { mediaID } = useParams();
    const movie = movies.find(p => p.id === parseInt(mediaID));



    if (!movie) {
      return <div className="error">Loading...</div>; // Or handle the case where movie is not found
    }



  const [watchedList, setWatchedList] = useState([]);
  const [planToWatchList, setPlanToWatchList] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ name: '', description: '', rating: 0 });



  const handleWatched = () => {
    alert('Movie added to Watched List');
    setWatchedList([...watchedList, movie]);
    setPlanToWatchList(planToWatchList.filter(item => item.title !== movie.title));
  };

  const handlePlanToWatch = () => {
    alert('Movie added to Plan to Watch List');
    setPlanToWatchList([...planToWatchList, movie]);
    setWatchedList(watchedList.filter(item => item.title !== movie.title));
  };

  const handleAddReview = () => {
    if (newReview.name && newReview.description && newReview.rating > 0) {
      setReviews([...reviews, newReview]);
      setNewReview({ name: '', description: '', rating: 0 });
    } else {
      alert('Please fill out all fields and provide a rating.');
    }
  };

  const coverImgStyle = {
    backgroundImage: `url(${movie.img})`,
    backgroundAttachment: 'fixed',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '100%',
    height: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  };


  return (
    <div className="movie-details-page">
      <div className="movie-details" style={coverImgStyle}>
      <div className="allsection">
        <div className="section1">
            <img src={movie.img} alt={movie.title} className="movie-img" />
        </div>
        <div className="section2">
          <h2>{movie.title}</h2>
          <div >
            <button className = "button1" onClick={handleWatched}>Watched</button>
            <button className = "button2" onClick={handlePlanToWatch}>Plan to Watch</button>
          </div>
          <p>{movie.description}</p>
        </div>
        <div className="section3">
          <p><strong>Rating:</strong> {movie.rating}</p>
          <p><strong>Release Date:</strong> {movie.releaseDate}</p>
          <p><strong>Type:</strong> {movie.type}</p>
          <p><strong>Episodes:</strong> {movie.episodes}</p>
          <p><strong>Duration:</strong> {movie.duration}</p>

          <p className="genre-box">
          <strong>Genre:</strong> {movie.genre.map((item, index) => (
            <span key={index} className="genre-item-box">{item}</span>
            ))}
          </p>

          <p><strong>Company:</strong> {movie.companyName}</p>
        </div>
      </div>
      </div>

      {/*##################  roles & news section */}

      <div className="movie-details-middle">

            <div className="roles-section">
                <h3>Top Cast</h3>
                <div className="roles-list">
                {movie.role.map((role, index) => (
                    <RoleCard key={index} role={role} />
                ))}
                </div>
            </div>

            <div className="news-section">
                <h3>News & Updates</h3>
                <div className="news-list">
                {movie.news.map((newsItem, index) => (
                    <NewsCard key={index} news={newsItem} />
                ))}
                </div>
            </div>
      </div>

     {/*##################  reviews section */}


      <div className="reviews-section">
            <h3 className="review-rating-title">Reviews & Rating</h3>

            {movie.review.map((review, index) => (
            <ReviewCard key={index} review={review} />
            ))}

            <div className="add-review">
            <h4 style={{ color: 'white' }}>Add a Review</h4>
            <div className="rating-review-box">
                <textarea
                placeholder="Your Review"
                value={newReview.description}
                onChange={(e) => setNewReview({ ...newReview, description: e.target.value })}
                />
                <select
                value={newReview.rating}
                onChange={(e) => setNewReview({ ...newReview, rating: parseInt(e.target.value) })}
                >
                <option value={0}>0</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                </select>
            </div>
            {/* <input
                type="text"
                placeholder="Your Name"
                value={newReview.name}
                onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
            /> */}
            <button onClick={handleAddReview}>Submit Review</button>
            </div>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
