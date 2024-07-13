import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

const Login = ({ setUserType }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedUserType, setSelectedUserType] = useState('user'); // Default to 'user'
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Use selectedUserType from the dropdown
    const userType = selectedUserType;
    
      try {
        const response = await fetch(`http://localhost:5000/login/${selectedUserType}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });
        if(response.status === 200) {
          const data = await response.json();
          // set user_id in localStorage
          localStorage.setItem('user_id', data.user_id);
          localStorage.setItem('userType', selectedUserType);
          localStorage.setItem('username', username);
          console.log("USERTYPE-----------"+localStorage.getItem('userType'));
          
          setUserType(selectedUserType);

          navigate(`/${username}/home`);
        } else {
          alert('Invalid credentials');
        }
      }
      catch (error) {
        console.error('Error:', error);
      }
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
          <div className="form-group-login">
            <label>User Type:</label>
            <select
              value={selectedUserType}
              onChange={(e) => setSelectedUserType(e.target.value)}
              className="form-control"
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
