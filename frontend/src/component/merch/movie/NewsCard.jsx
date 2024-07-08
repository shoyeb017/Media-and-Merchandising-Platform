import React from 'react';
import './NewsCard.css';

const NewsCard = ({ news }) => {
  return (
    <div className="news-card">
      <h4>{news.title}</h4>
      <p>{news.description}</p>
    </div>
  );
};

export default NewsCard;
