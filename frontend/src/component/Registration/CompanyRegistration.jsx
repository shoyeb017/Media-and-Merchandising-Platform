import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CompanyRegistration.css';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from "uuid";
import Footer from '../user/common/Footer.jsx';
import { storage } from '../../firebase';
import Swal from 'sweetalert2'

const CompanyRegistration = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    name: '',
    email: '',
    description: '',
    imageUrl: '',
  });

  const [imageUpload, setImageUpload] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const checkUsernameExists = async (username) => {
    try {
      console.log('Checking username:', username);

      const response = await fetch('http://localhost:5000/registration/company/check-username', {
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
      if (formData[key] === '' && key !== 'imageUrl') {
        alert('Please fill in the ${key} field.');
        return;
      }
    }

    if (!imageUpload) {
      alert('Please upload an image.');
      return;
    }

    // Check if username already exists
    const usernameExists = await checkUsernameExists(formData.username);
    if (usernameExists) {
      console.log('Username already exists.');
      Swal.fire({
        title: 'Username already exists!',
        text: 'Please choose a different username.',
        icon: 'warning',
        confirmButtonText: 'OK'
      })
      return;
    }

    try {
      // Upload the image and get the URL
      const imageRef = ref(storage, 'company/profile/${imageUpload.name + v4()}');
      console.log('Uploading image...');
      await uploadBytes(imageRef, imageUpload);
      console.log('Image uploaded successfully.');
      const url = await getDownloadURL(imageRef);
      console.log('Image URL:', url);

      const updatedFormData = { ...formData, imageUrl: url };

      // Send the form data to the backend
      const response = await fetch('http://localhost:5000/registration/company', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedFormData),
      });
      if (response.status === 201) {
        alert('Registration successful!');
        setFormData({
          username: '',
          password: '',
          name: '',
          email: '',
          description: '',
          imageUrl: '',
        });

        navigate('/');
      } else {
        // Check if the response has content
        if (response.headers.get('Content-Length') > '0') {
          const errorData = await response.json();
          console.error('Error during registration:', errorData);
          alert('An error occurred during registration. Please try again.');
        } else {
          // Handle case where there is no response body
          console.error('Error during registration: No response body');
          alert('An error occurred during registration. No details available.');
        }
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('An error occurred during registration. Please try again.');
    }
  };

  return (
    <>
      <h2 className="title">Company Registration</h2>
      <div className="registration-container-company">
        <form onSubmit={handleSubmit} className="registration-form">
          <div className="form-group">
            <label>Upload Image:</label>
            <input
              type="file"
              onChange={(event) => {
                setImageUpload(event.target.files[0]);
              }}
              required
            />
          </div>
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