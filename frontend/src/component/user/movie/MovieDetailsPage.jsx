import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import RoleCard from './RoleCard';
import NewsCard from './NewsCard';
import './MovieDetailsPage.css';
import ReactPlayer from 'react-player';

const ReviewCard = ({ review }) => {
    return (
        <div className="review-card">
            <h4 className="review-name">{review.name}</h4>
            <p className="review-desc">{review.description}</p>
            <p className="review-rating">Rating: {review.rating}/5</p>
        </div>
    );
};

const DiscussionCard = ({ discussion }) => {
    return (
        <div className="discussion-card">
            <h4 className="discussion-topic">{discussion.TOPIC}</h4>
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
    const [newReview, setNewReview] = useState({ name: '', description: '', rating: 0 });
    const [newDiscussion, setNewDiscussion] = useState({ topic: '', description: '' });
    const [discussions, setDiscussions] = useState([]);

    const userId = localStorage.getItem('user_id');

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await fetch('http://localhost:5000/media/page', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id: mediaID }),
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch movie DISCUSSION');
                }
                const movieDetails = await response.json();
                setMovieDetails(movieDetails);
                console.log(movieDetails);
            } catch (err) {
                console.error('Failed to fetch movie Discussion:', err);
            }
        };
        fetchMovieDetails();
        console.log
    }, [mediaID]);

    /// discussion-------------------------------------------------------------------------------------

    useEffect(() => {
        const fetchMovieDis = async () => {
            try {
                const response = await fetch('http://localhost:5000/discussions/media', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id: mediaID }),
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch movie details');
                }
                const movieDetails = await response.json();
                setDiscussions(movieDetails);
            } catch (err) {
                console.error('Failed to fetch movie details:', err);
            }
        };
        fetchMovieDis();
    }, [mediaID]);

    

    if (!movieDetails) {
        return <div className="error">Loading...</div>; // Or handle the case where movie is not found
    }

    const handleWatched = async () => {
        alert('Movie added to Watched List');
        setWatchedList([...watchedList, movieDetails]);
        setPlanToWatchList(planToWatchList.filter(item => item.title !== movieDetails.title));

        try {
            await fetch('http://localhost:5000/media/mylist/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user_id: userId, media_id: movieDetails.id, status : 'WATCHED' }),
            });

        } catch (error) {
            console.error('Error updating eatched list:', error);
        }
    };

    const handlePlanToWatch = async () => {
        alert('Movie added to Plan to Watch List');
        setPlanToWatchList([...planToWatchList, movieDetails]);
        setWatchedList(watchedList.filter(item => item.title !== movieDetails.title));

        try {
            await fetch('http://localhost:5000/media/mylist/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user_id: userId, media_id: movieDetails.id, status : 'PLAN_TO_WATCH' }),
            });

        } catch (error) {
            console.error('Error updating plan to watch list:', error);
        }
    };

    const handleAddReview = () => {
        if (newReview.name && newReview.description && newReview.rating > 0) {
            setReviews([...reviews, newReview]);
            setNewReview({ name: '', description: '', rating: 0 });
        } else {
            alert('Please fill out all fields and provide a rating.');
        }
    };

    const handleAddDiscussion = async () => {
        if (newDiscussion.topic && newDiscussion.description) {
            setDiscussions([...discussions, newDiscussion]);
            setNewDiscussion({ topic: '', description: '' });
        } else {
            alert('Please fill out both topic and description.');
        }

        try {
            await fetch('http://localhost:5000/discussions/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user_id: userId, media_id: movieDetails.id, topic: newDiscussion.topic, description: newDiscussion.description }),
            });
        }
        catch (error) {
            console.error('Error adding discussion:', error
            );
        }
        const fetchMovieDis = async () => {
            try {
                const response = await fetch('http://localhost:5000/discussions/media', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id: mediaID }),
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch movie details');
                }
                const movieDetails = await response.json();
                setDiscussions(movieDetails);
            } catch (err) {
                console.error('Failed to fetch movie details:', err);
            }
        };
        fetchMovieDis();
        

        
    };

    const coverImgStyle = {
        backgroundImage: `url(${movieDetails.img})`,
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
                        <img src={movieDetails.img} alt={movieDetails.title} className="movie-img" />
                    </div>
                    <div className="section2">
                        <h2>{movieDetails.title}</h2>
                        <div>
                            <button className="button1" onClick={handleWatched}>Watched</button>
                            <button className="button2" onClick={handlePlanToWatch}>Plan to Watch</button>
                        </div>
                        <p>{movieDetails.description}</p>
                    </div>
                    <div className="section3">
                        <p><strong>Rating:</strong> {movieDetails.rating}</p>
                        <p><strong>Release Date:</strong> {movieDetails.releaseDate}</p>
                        <p><strong>Type:</strong> {movieDetails.type}</p>
                        <p><strong>Episodes:</strong> {movieDetails.episodes}</p>
                        <p><strong>Duration:</strong> {movieDetails.duration}</p>
                        <p className="genre-box">
                            <strong>Genre:</strong> {movieDetails.genre.map((item, index) => (
                                <span key={index} className="genre-item-box">{item}</span>
                            ))}
                        </p>
                        <p><strong>Company:</strong> {movieDetails.companyName}</p>
                    </div>
                </div>
            </div>

            <ReactPlayer url={movieDetails.trailer} className="trailer-player"/>
            {/* Roles & News Section */}
            <div className="movie-details-middle">
                <div className="roles-section">
                    <h3>Top Cast</h3>
                    <div className="roles-list">
                        {movieDetails.role.map((role, index) => (
                            <RoleCard key={index} role={role} />
                        ))}
                    </div>
                </div>

                <div className="news-section">
                    <h3>News & Updates</h3>
                    <div className="news-list">
                        {movieDetails.news.map((newsItem, index) => (
                            <NewsCard key={index} news={newsItem} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Reviews Section */}
            <div className="reviews-section">
                <h3 className="review-rating-title">Reviews & Rating</h3>
                {movieDetails.review.map((review, index) => (
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
                            <option value={6}>6</option>
                            <option value={7}>7</option>
                            <option value={8}>8</option>
                            <option value={9}>9</option>
                            <option value={10}>10</option>
                            
                        </select>
                    </div>
                    <input
                        type="text"
                        placeholder="Your Name"
                        value={newReview.name}
                        onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                    />
                    <button onClick={handleAddReview}>Submit Review</button>
                </div>
            </div>
            {/* Discussions Section */}
            <div className="discussions-section">
                <h3 className="discussion-title">Discussions</h3>
                {discussions.map((discussion, index) => (
                    <DiscussionCard key={index} discussion={discussion} />
                ))}

                <div className="add-discussion">
                    <h4 style={{ color: 'white' }}>Add a Discussion</h4>
                    <input
                        type="text"
                        placeholder="Topic"
                        value={newDiscussion.topic}
                        onChange={(e) => setNewDiscussion({ ...newDiscussion, topic: e.target.value })}
                        className="discussion-name"
                    />
                    <textarea
                        placeholder="Discussion Description"
                        value={newDiscussion.description}
                        onChange={(e) => setNewDiscussion({ ...newDiscussion, description: e.target.value })}
                        className="discussion-des"
                    />
                    <button onClick={handleAddDiscussion}>Submit Discussion</button>
                </div>
            </div>

        </div>
    );
};

export default MovieDetailsPage;
