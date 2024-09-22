// src/components/ReplyCard.jsx
import React from 'react';
import './ReplyCard.css';

const ReplyCard = ({ name, text }) => {
  return (
    <div className="reply-card">
      <div className="reply-card-avatar">
        <i class="fa-regular fa-circle-user"></i>
      </div>
      <div className="reply-card-content">
        <p className="reply-card-name">{name}</p>
        <p className="reply-card-text">{text}</p>
      </div>
      
    </div>
  );
};

export default ReplyCard;
