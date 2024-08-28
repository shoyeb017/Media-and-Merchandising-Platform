import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MerchandiserRegistration.css'; // Import the CSS file
import Footer from '../user/common/Footer.jsx';

const MerchandiserRegistration = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    name: '',
    description: '',
    email: '',
    city: '',
    street: '',
    house: '',
    phone: '',
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    for (const key in formData) {
      if (formData[key] === '') {
        alert(`Please fill in the ${key} field.`);
        return;
      }
    }


    const checkUsernameExists = async (username) => {
      try {
        console.log('Checking username:', username);
  
        const response = await fetch('http://localhost:5000/registration/merch/check-username', {
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


    // Check if username already exists
    const usernameExists = await checkUsernameExists(formData.username);
    if (usernameExists) {
      alert('Username already exists. Please choose a different username.');
      return;
    }

    try {
      fetch('http://localhost:5000/registration/merchandiser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then((response) => {
          if (response.status === 201) {
            alert('Registration successful!');
            setFormData({
              username: '',
              password: '',
              name: '',
              description: '',
              email: '',
              city: '',
              street: '',
              house: '',
              phone: '',
            });
            
            navigate('/');
          } else {
            alert('Registration failed');
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
    catch (error) {
      console.error('Error:', error);
    }



  };

  return (
    <>
      <h2 className="title">Merchandiser Registration</h2>
      <div className="registration-container-merch">
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
            <label>Description:</label>
            <textarea
              name="description"
              value={formData.description}
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
          <button type="submit" className="btn-register">
            Register
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default MerchandiserRegistration;
