import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import styles from './Login.module.css';

const Login = ({ setUserType }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedUserType, setSelectedUserType] = useState('user'); // Default to 'user'
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    // Use selectedUserType from the dropdown
    let userType = selectedUserType;

    // Perform additional checks if needed based on username and password
    if ((username === '1' && password !== '1') ||
        (username === '2' && password !== '2') ||
        (username === '3' && password !== '3') ||
        (username === '4' && password !== '4')) {
      alert('Invalid credentials');
      return;
    }

    // Set user type and username in localStorage
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
          <div className="form-group-login">
          <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-control0"
            />
          </div>
          <div className="form-group-login">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="form-group-login">
            <label>User Type:</label>
            <select
              value={selectedUserType}
              onChange={(e) => setSelectedUserType(e.target.value)}
              className="form-user-type"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="merchandiser">Merchandiser</option>
              <option value="company">Company</option>
            </select>
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
