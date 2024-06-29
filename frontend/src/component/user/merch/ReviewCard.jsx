import React from 'react';
import './ReviewCard.css';

const ReviewCard = ({ review }) => {
  return (
    <div className="review-card">
      <h4 className="review-name">{review.name}</h4>
      <p className="review-desc">{review.description}</p>
      <p className="review-rating">Rating: {review.rating}/5</p>
    </div>
  );
};

export default ReviewCard;
