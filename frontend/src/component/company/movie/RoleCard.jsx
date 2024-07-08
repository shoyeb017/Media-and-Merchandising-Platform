import React from 'react';
import './RoleCard.css';

const RoleCard = ({ role }) => {
  return (
    <div className="role-card">
      <img src={role.img} alt={role.name} className="role-img" />
      <div className="role-info">
        <h4>{role.name}</h4>
        <p>{role.roleType}</p>
      </div>
    </div>
  );
};

export default RoleCard;
