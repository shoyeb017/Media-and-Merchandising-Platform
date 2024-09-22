import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserRegistration.css'; // Import the CSS file
import Footer from '../user/common/Footer.jsx';

const UserRegistration = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    name: '',
    dob: '',
    email: '',
    city: '',
    street: '',
    house: '',
    phone: '',
  });

  const [selectedGenres, setSelectedGenres] = useState([]);
  const navigate = useNavigate();

  const genres = [
    'ACTION', 'ADVENTURE', 'COMEDY', 'DRAMA', 'FANTASY', 'HISTORICAL', 'HORROR', 'MAGIC',
    'MYSTERY', 'PSYCHOLOGICAL', 'ROMANCE', 'SCI-FI', 'SUPERNATURAL', 'SPORTS', 'THRILLER', 'TRAGEDY'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleGenreClick = (genre) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };


  const checkUsernameExists = async (username) => {
    try {
      console.log('Checking username:', username);

      const response = await fetch('http://localhost:5000/registration/user/check-username', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }), // Send username as an object
      });
      if (response.status === 409) {
        console.log('Username already exists.');
        return true;
      }
      console.log('Username is available.');
      return false;
    } catch (error) {
      console.error('Error checking username:', error);
      return false;
    }
  }; 


  const handleSubmit = async (e) => {
    e.preventDefault();
    for (const key in formData) {
      if (formData[key] === '') {
        alert(`Please fill in the ${key} field.`);
        return;
      }
    }


    const usernameExists = await checkUsernameExists(formData.username);
    if (usernameExists) {
      alert('Username already exists. Please choose a different username.');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:5000/registration/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, genres: selectedGenres }),
      });
  
      if (response.status === 201) {
        alert('Registration successful!');
        setFormData({
          username: '',
          password: '',
          name: '',
          dob: '',
          email: '',
          city: '',
          street: '',
          house: '',
          phone: '',
        });
        setSelectedGenres([]);
        navigate('/');
      } else {
        alert('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Error registering user:', error);
      alert('An error occurred during registration. Please try again.');
    }
  };
  
  return (
    <div className="full-section">
      <h2 className="title"><i className="fa fa-user"></i>User Registration</h2>
      <div className="registration-container">
        <form onSubmit={handleSubmit} className="registration-form">
          <div className="form-group">
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Date of Birth:</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>City:</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Street:</label>
            <input
              type="text"
              name="street"
              value={formData.street}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>House:</label>
            <input
              type="text"
              name="house"
              value={formData.house}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Phone No:</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="genre-section">
            <label>Select some genres you like:</label>
            <div className="genre-buttons">
              {genres.map((genre) => (
                <button
                  type="button"
                  key={genre}
                  className={`genre-button ${
                    selectedGenres.includes(genre) ? 'selected' : ''
                  }`}
                  onClick={() => handleGenreClick(genre)}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>
          <button type="submit" className="btn-register">
            Register
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default UserRegistration;
