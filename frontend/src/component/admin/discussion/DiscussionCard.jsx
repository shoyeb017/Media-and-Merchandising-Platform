// src/components/DiscussionCard.jsx
import React from 'react';
import './DiscussionCard.css';

const DiscussionCard = ({ title, topic, description, replyCount, onClick }) => {
  return (
    <div className="discussion-card" onClick={onClick}>
      <h3 className="discussion-card-title">{title}</h3>
      <p className="discussion-card-topic">{topic}</p>
      <p className="discussion-card-description">{description}</p>
      <div className="discussion-card-reply-count">{replyCount} replies</div>
    </div>
  );
};

export default DiscussionCard;
