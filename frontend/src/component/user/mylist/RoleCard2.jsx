import React from 'react';
import './RoleCard2.css'; // Import the CSS for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const RoleCard2 = ({ role, handleDeleteRole }) => {

    // console.log(role);
  return (
    <div className="role2-card">
            <img src={role.IMG} alt={role.NAME} className="role2-img" />
            <div className="role2-info">
                <h4>{role.NAME}</h4>
                <p>{role.ROLE_TYPE}</p>
            </div>
            <button className='role2-action' onClick={handleDeleteRole}>
              <FontAwesomeIcon icon={faXmark} className="remove-icon"/>

            </button>
        </div>
  );
};

export default RoleCard2;