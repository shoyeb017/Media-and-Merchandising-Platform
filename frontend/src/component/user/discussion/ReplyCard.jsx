// src/components/ReplyCard.jsx
import React from 'react';
import './ReplyCard.css';

const ReplyCard = ({ name, text }) => {
  return (
    <div className="reply-card">
      <p className="reply-card-name">{name}</p>
      <p className="reply-card-text">{text}</p>
    </div>
  );
};

export default ReplyCard;
