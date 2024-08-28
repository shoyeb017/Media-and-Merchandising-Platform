import React from 'react';
import './NewsCard.css';

const NewsCard = ({ news }) => {
  return (
    <div className="news-card">
      {/* headline and tile will be on the same line */}
      <h4>{news.HEADLINE}</h4>
      <p>{news.TITLE}</p>

      <p>{news.DESCRIPTION}</p>
    </div>
  );
};

export default NewsCard;
