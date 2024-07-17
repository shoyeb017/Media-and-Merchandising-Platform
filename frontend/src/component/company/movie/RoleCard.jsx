import React from 'react';
import './RoleCard.css';

const RoleCard = ({ role }) => {
  return (
    <div className="role-card">
      <img src={role.IMG} alt={role.NAME} className="role-img" />
      <div className="role-info">
        <h4>{role.NAME}</h4>
        <p>{role.ROLE_TYPE}</p>
      </div>
    </div>
  );
};

export default RoleCard;
