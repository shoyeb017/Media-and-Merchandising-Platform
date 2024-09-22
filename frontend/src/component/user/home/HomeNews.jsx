import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './HomeNews.css';
import orange from './orange.jpg'; // Correctly import the background image

const HomeNews = () => {
    const [username, setUsername] = useState('');
    const [topNews, setTopNews] = useState([]);
    const [latestNews, setLatestNews] = useState([]);

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
          setUsername(storedUsername);
        }
      }, []);

    // Fetch the latest news
    const fetchLatestNews = async () => {
        try {
            const response = await fetch('http://localhost:5000/home/news'); // GET request

            if (!response.ok) {
                throw new Error('Failed to fetch latest news');
            }

            const data = await response.json();
            setTopNews(data.topNews);
            setLatestNews(data.latestNews);
            console.log('Latest news items:', data);

        } catch (err) {
            console.error('Failed to fetch latest news:', err);
            setTopNews([]); // Handle the error by setting to an empty array
            setLatestNews([]); // Handle the error by setting to an empty array
        }
    };

    useEffect(() => {
        fetchLatestNews();
    }, []);

    return (
        <div className="home-news-background">
            <img className="home-news-img" src={orange} alt="Background" />
            <div className="news-container">
                <p className="news-container-title"><i class="fa fa-bullhorn" aria-hidden="true"></i>MMP News</p>
                <div className="news-container-lower">
                <div className="top-news">
                    <p className="news-container-lower-title">Top News</p>
                    {topNews.length > 0 ? (
                        topNews.map((news, index) => (
                            <Link to={`/${username}/media/${news.MEDIA_ID}`} className="link-product-card">
                            <div className="news-item" key={index}>
                                <img src={news.POSTER || 'default-image-url'} alt={news.HEADLINE} />
                                <div className="news-content">
                                    <p className="news-content-title">{news.HEADLINE}</p>
                                    <p className="news-content-date">{news.NEWS_DATE}</p>
                                    <p className="news-content-desc">{news.DESCRIPTION}</p>
                                </div>
                            </div>
                            </Link>
                        ))
                    ) : (
                        <p>No top news available</p>
                    )}
                </div>
                <div className="latest-news">
                <p className="news-container-lower-title">Latest</p>
                    {latestNews.length > 0 ? (
                        latestNews.map((news, index) => (
                            <Link to={`/${username}/media/${news.MEDIA_ID}`} className="link-product-card">
                            <div className="news-item-latest" key={index}>
                                <img src={news.POSTER || 'default-image-url'} alt={news.HEADLINE} />
                                <div className="news-latest-content">
                                    <p className="news-latest-content-title">{news.HEADLINE}</p>
                                    <p className="news-latest-content-date">{news.NEWS_DATE}</p>
                                    <p className="news-latest-content-desc">{news.DESCRIPTION}</p>
                                </div>
                            </div>
                            </Link>
                        ))
                    ) : (
                        <p>No latest news available</p>
                    )}
                </div>
                </div>
            </div>
        </div>
    );
};

export default HomeNews;
