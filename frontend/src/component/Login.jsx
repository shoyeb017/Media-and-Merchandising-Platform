import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

const Login = ({ setUserType }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    let userType = null;
    if (username === '1' && password === '1') {
      userType = 'user';
    } else if (username === '2' && password === '2') {
      userType = 'admin';
    } else if (username === '3' && password === '3') {
      userType = 'merchandiser';
    } else if (username === '4' && password === '4') {
      userType = 'company';
    } else {
      alert('Invalid credentials');
      return;
    }

    setUserType(userType);
    localStorage.setItem('userType', userType);
    localStorage.setItem('username', username);
    navigate(`/${username}/home`);
  };

  

  return (
    <div className="login-container0">
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-control0"
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
            />
          </div>
          <button type="submit" className="btn-login">Login</button>

          <Link to={`/registration`}>
            <button type="button" className="btn-registration">Registration</button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
