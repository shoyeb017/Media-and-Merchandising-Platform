// src/components/DiscussionCard.jsx
import React from "react";
import "./DiscussionCard.css";

const DiscussionCard = ({
  title,
  topic,
  description,
  replyCount,
  date,
  poster,
  onClick,
}) => {
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="discussion-card" onClick={onClick}>
      <div className="discussion-card-part1">
        <i class="fa-solid fa-bars"></i>
        <img src={poster} alt="poster" className="discussion-card-poster" />
      </div>
      <div className="discussion-card-part2">
        <p className="discussion-card-topic">{topic}</p>
        <h3 className="discussion-card-title">{title}</h3>
        <p className="discussion-card-description">{description}</p>
        <div className="discussion-card-inner">
          <p className="discussion-card-date">{formatDate(date)}</p>
          <div className="discussion-card-reply-count">
            {replyCount} replies
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscussionCard;
