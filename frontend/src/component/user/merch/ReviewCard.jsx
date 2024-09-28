import React from 'react';
import './ReviewCard.css';

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
    <div className="review-card1000">
      <i class="fa-regular fa-circle-user"></i>
      <div>
        <h4 className="review-name1000">{review.name}</h4>
        <p className="review-desc1000">{review.description}</p>
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
          <p className="review-rating1000">
            {" "}
            Review Rating: <strong>{(review.rating / 2).toFixed(1)} </strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
