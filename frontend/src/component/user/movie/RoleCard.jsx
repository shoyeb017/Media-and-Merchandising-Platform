import React, { useState } from 'react';
import './RoleCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const RoleCard = ({ role }) => {
  const [favorites, setFavorites] = useState([]);

  const isFavorite = favorites.includes(role.ID);

  const toggleFavorite = (roleId) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(roleId)) {
        return prevFavorites.filter((favId) => favId !== roleId);
      } else {
        return [...prevFavorites, roleId];
      }
    });
  };

  return (
    <div className="role-card">
      <img src={role.IMG} alt={role.NAME} className="role-img" />
      <div className="role-info">
        <h4>{role.NAME}</h4>
        <p>{role.ROLE_TYPE}</p>
      </div>
      <button className="role-action" onClick={() => toggleFavorite(role.ID)}>
        <FontAwesomeIcon icon={faHeart} className={`heart-icon ${isFavorite ? 'favorite' : ''}`} />
      </button>
    </div>
  );
};

export default RoleCard;
