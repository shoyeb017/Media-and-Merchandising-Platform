import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Registration.css'; 

const Registration = () => {
  const [registrationType, setRegistrationType] = useState('user');
  const navigate = useNavigate();

  const handleSelectionChange = (e) => {
    setRegistrationType(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/registration/${registrationType}`);
  };

  return (
    <div className="selection-container">
      <form onSubmit={handleSubmit} className="selection-form">
        <div className="form-group">
          <h3 htmlFor="registrationType">Select Registration:</h3>
          <div className="selection">
            <text className="type-text">Type</text>
            <select
              id="registrationType"
              value={registrationType}
              onChange={handleSelectionChange}
            >
              <option value="user">User</option>
              <option value="company">Company</option>
              <option value="merchandiser">Merchandiser</option>
            </select>
          </div>
        </div>
        <button type="submit" className="btn-submit">Submit</button>
      </form>
    </div>
  );
};

export default Registration;
