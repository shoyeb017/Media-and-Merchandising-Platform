import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CompanyRegistration.css'; // Import the CSS file
import Footer from '../user/common/Footer.jsx';

const CompanyRegistration = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    name: '',
    email: '',
    description: '',
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    for (const key in formData) {
      if (formData[key] === '') {
        alert(`Please fill in the ${key} field.`);
        return;
      }
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (!Array.isArray(users)) {
      localStorage.setItem('users', JSON.stringify([]));
    }

    users.push({ ...formData, type: 'company' });
    localStorage.setItem('users', JSON.stringify(users));

    alert('Registration successful!');

    setFormData({
      username: '',
      password: '',
      name: '',
      email: '',
      description: '',
    });

    // Navigate to another page after successful registration
    // navigate('/');
  };

  return (
    <>
      <h2 className="title">Company Registration</h2>
      <div className="registration-container-company">
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
            <label>Description:</label>
            <textarea
              name="description"
              value={formData.description}
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

export default CompanyRegistration;
