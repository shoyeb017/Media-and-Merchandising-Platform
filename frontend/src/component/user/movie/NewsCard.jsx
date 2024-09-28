import React from 'react';
import './NewsCard.css';
import newss from './newss.jpg';
const NewsCard = ({ news }) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="news-card111">
      <img src={newss} alt="News" className="news-img111" />
      <h4>{news.topic}</h4>
      <p style={{ color: '#2abdbb', fontSize: '12px' }}>{formatDate(news.date)}</p>
      <p>{news.description}</p>
    </div>
  );
};

export default NewsCard;
