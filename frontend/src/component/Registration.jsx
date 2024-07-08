import React, { useState } from 'react';
import './Registration.css'; // Import the CSS file

const Registration = () => {
  const [userType, setUserType] = useState('user');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    name: '',
    dob: '',
    age: '',
    email: '',
    city: '',
    street: '',
    house: '',
    phone: '',
    description: ''
  });

  const handleUserTypeChange = (type) => {
    setUserType(type);
    setFormData({
      username: '',
      password: '',
      name: '',
      dob: '',
      age: '',
      email: '',
      city: '',
      street: '',
      house: '',
      phone: '',
      description: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate form data
    for (const key in formData) {
      if (formData[key] === '' && (userType !== 'company' || key !== 'dob' && key !== 'age' && key !== 'city' && key !== 'street' && key !== 'house' && key !== 'phone')) {
        alert(`Please fill in the ${key} field.`);
        return;
      }
    }

    // Store data in a map list
    const users = JSON.parse(localStorage.getItem('users')) || {};
    users[formData.username] = { ...formData, type: userType };
    localStorage.setItem('users', JSON.stringify(users));

    alert('Registration successful!');
    setFormData({
      username: '',
      password: '',
      name: '',
      dob: '',
      age: '',
      email: '',
      city: '',
      street: '',
      house: '',
      phone: '',
      description: ''
    });
  };

  return (
    <div className="registration-container">
      <div className="button-container">
        <button
          className={userType === 'user' ? 'active' : ''}
          onClick={() => handleUserTypeChange('user')}
        >
          User
        </button>
        <button
          className={userType === 'company' ? 'active' : ''}
          onClick={() => handleUserTypeChange('company')}
        >
          Company
        </button>
        <button
          className={userType === 'merchandiser' ? 'active' : ''}
          onClick={() => handleUserTypeChange('merchandiser')}
        >
          Merchandiser
        </button>
      </div>

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
        {userType === 'user' && (
          <>
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
              <label>Age:</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                required
              />
            </div>
          </>
        )}
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
        {userType !== 'company' && (
          <>
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
          </>
        )}
        {userType !== 'user' && (
          <div className="form-group">
            <label>Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </div>
        )}
        <button type="submit" className="btn-register">Register</button>
      </form>
    </div>
  );
};

export default Registration;
