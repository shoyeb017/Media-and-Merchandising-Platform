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

const MovieDetailsPage = () => {
    const { mediaID } = useParams();
    const [movieDetails, setMovieDetails] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [news, setNews] = useState([]);
    const [newNews, setNewNews] = useState({ topic: '', description: '' });

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
                    throw new Error('Failed to fetch movie details');
                }
                const movieDetails = await response.json();
                setMovieDetails(movieDetails);
                console.log(movieDetails);
            } catch (err) {
                console.error('Failed to fetch movie details:', err);
            }
        };
        fetchMovieDetails();
    }, [mediaID]);

    if (!movieDetails) {
        return <div className="error">Loading...</div>; // Or handle the case where movie is not found
    }


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

                    <div className="add-news">
                    <h4 style={{ color: 'white' }}>Add a News</h4>
                    <input
                        type="text"
                        placeholder="Headline"
                        value={newNews.topic}
                        onChange={(e) => setNewNews({ ...newNews, topic: e.target.value })}
                        className="news-name"
                    />
                    <textarea
                        placeholder="News Description"
                        value={newNews.description}
                        onChange={(e) => setNewNews({ ...newNews, description: e.target.value })}
                        className="news-des"
                    />
                    <button onClick={handleAddNews}>Submit</button>

                </div>
                </div>
            </div>

            {/* Reviews Section */}
            <div className="reviews-section">
                <h3 className="review-rating-title">Reviews & Rating</h3>
                {movieDetails.review.map((review, index) => (
                    <ReviewCard key={index} review={review} />
                ))}
            </div>

        </div>
    );
};

export default MovieDetailsPage;
