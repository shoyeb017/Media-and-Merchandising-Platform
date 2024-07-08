import React, { useState } from 'react';
import './ProfilePage.css';

const ProfilePage = () => {
  const initialProfile = {
    name: 'John Doe',
    dob: '1990-01-01',
    age: 34,
    email: 'john.doe@example.com',
    city: 'New York',
    street: '5th Avenue',
    house: '123',
  };

  const [profile, setProfile] = useState(initialProfile);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleUpdate = () => {
    // Handle the update logic (e.g., save the updated profile to a server)
    console.log("Updated Profile:", profile);
    setIsEditing(false);
  };

  return (
    <div className="profile-page">
      <h2>Profile</h2>
      <div className="profile-info">
        <label>Name: </label>
        {isEditing ? (
          <input type="text" name="name" value={profile.name} onChange={handleChange} />
        ) : (
          <span>{profile.name}</span>
        )}
      </div>
      <div className="profile-info">
        <label>Date of Birth: </label>
        {isEditing ? (
          <input type="date" name="dob" value={profile.dob} onChange={handleChange} />
        ) : (
          <span>{profile.dob}</span>
        )}
      </div>
      <div className="profile-info">
        <label>Age: </label>
        {isEditing ? (
          <input type="number" name="age" value={profile.age} onChange={handleChange} />
        ) : (
          <span>{profile.age}</span>
        )}
      </div>
      <div className="profile-info">
        <label>Email: </label>
        {isEditing ? (
          <input type="email" name="email" value={profile.email} onChange={handleChange} />
        ) : (
          <span>{profile.email}</span>
        )}
      </div>
      <div className="profile-info">
        <label>City: </label>
        {isEditing ? (
          <input type="text" name="city" value={profile.city} onChange={handleChange} />
        ) : (
          <span>{profile.city}</span>
        )}
      </div>
      <div className="profile-info">
        <label>Street: </label>
        {isEditing ? (
          <input type="text" name="street" value={profile.street} onChange={handleChange} />
        ) : (
          <span>{profile.street}</span>
        )}
      </div>
      <div className="profile-info">
        <label>House: </label>
        {isEditing ? (
          <input type="text" name="house" value={profile.house} onChange={handleChange} />
        ) : (
          <span>{profile.house}</span>
        )}
      </div>
      <div className="profile-buttons">
        {isEditing ? (
          <button onClick={handleUpdate}>Update</button>
        ) : (
          <button onClick={toggleEdit}>Edit</button>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
