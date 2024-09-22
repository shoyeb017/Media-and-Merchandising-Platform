import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TextField, Select, MenuItem, Button, InputLabel, FormControl } from '@mui/material';
import Swal from 'sweetalert2';
import './Login.css';

import cloud1 from '../assets/cloud1.png';
import cloud2 from '../assets/cloud2.png';
import cloud3 from '../assets/cloud3.png';

const Login = ({ setUserType }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedUserType, setSelectedUserType] = useState('user'); // Default to 'user'
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userType = selectedUserType;

    try {
      const response = await fetch(`http://localhost:5000/login/${selectedUserType}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      if (response.status === 200) {
        const data = await response.json();
        localStorage.setItem('user_id', data.user_id);
        localStorage.setItem('userType', selectedUserType);
        localStorage.setItem('username', username);
        
        setUserType(selectedUserType);

        navigate(`/${username}/home`);
      } else {
        Swal.fire({
          title: 'Invalid credentials!',
          text: 'Please enter valid credentials',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="login-background">
      {/* Floating cloud images */}
      <img src={cloud1} alt="Cloud 1" className="cloud cloud1" />
      <img src={cloud2} alt="Cloud 2" className="cloud cloud2" />
      <img src={cloud3} alt="Cloud 3" className="cloud cloud3" />

      <div className="login-container0">
        <h1 className="login-title">Welcome to <br /> Media & Merchandising <br /> Platform</h1>
        <h1 className="login-title1">Discover, Watch, and Own: Your Gateway to Media & Merchandising</h1>
        <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group-login1">
            <TextField
              label="Username"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
              sx={{
                input: { color: 'white' },
                label: { color: '#ccc' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#888',
                  },
                  '&:hover fieldset': {
                    borderColor: 'white',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: ' #ff640a',
                  },
                },
              }}
            />
          </div>
          <div className="form-group-login1">
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              sx={{
                input: { color: 'white' },
                label: { color: '#ccc' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#888',
                  },
                  '&:hover fieldset': {
                    borderColor: 'white',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: ' #ff640a',
                  },
                },
              }}
            />
          </div>
          <div className="form-group-login">
            <FormControl fullWidth variant="outlined" sx={{ minWidth: 120 }}>
              <InputLabel id="user-type-label" sx={{ color: '#ccc' }}>User Type</InputLabel>
              <Select
                labelId="user-type-label"
                value={selectedUserType}
                onChange={(e) => setSelectedUserType(e.target.value)}
                label="User Type"
                sx={{
                  color: 'white',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#888',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'white',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: ' #ff640a',
                  },
                }}
              >
                <MenuItem value="user">User</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="merchandiser">Merchandiser</MenuItem>
                <MenuItem value="company">Company</MenuItem>
              </Select>
            </FormControl>
          </div>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            sx={{
              backgroundColor: ' #ff640a',
              '&:hover': {
                backgroundColor: '#ff900a',
              },
              marginTop: '15px',
            }}
          >
            Login
          </Button>

          <Link to={`/registration`}>
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              sx={{ marginTop: '15px', borderColor: '#fff', color: '#fff',
                backgroundColor: 'transparent',
              '&:hover': {
                borderColor: '#ff900a',
              },
               }}
            >
              Registration
            </Button>
          </Link>
        </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
