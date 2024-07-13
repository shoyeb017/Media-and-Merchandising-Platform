import React, { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';
import { storage } from '../../../firebase'; // Make sure to configure and export your Firebase storage instance
import './ProfilePage.css';

const ProfilePage = () => {
  const initialProfile = {
    img: '/img/3.jpg', // Placeholder image URL
    name: 'Company XYZ',
    email: 'contact@companyxyz.com',
    description: 'This is a sample description of the company.',
  };

  const [profile, setProfile] = useState(initialProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [imagePreview, setImagePreview] = useState(initialProfile.img);
  const [imageUpload, setImageUpload] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageUpload(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleUpdate = async () => {
    let updatedProfile = { ...profile };

    // Only upload the image if a new file has been selected
    if (imageUpload) {
      const imageRef = ref(storage, `company/profile/${imageUpload.name + v4()}`);
      await uploadBytes(imageRef, imageUpload);
      const url = await getDownloadURL(imageRef);
      updatedProfile.img = url;
      // Clear the image upload state after uploading
      setImageUpload(null);
    }

    // Handle the update logic (e.g., save the updated profile to a server)
    console.log("Updated Profile:", updatedProfile);
    setProfile(updatedProfile);
    setIsEditing(false);
  };

  return (
    <div className="company-profile-page">
      <h2>Company Profile</h2>
      <div className="profile-info-image">
        {isEditing ? (
          <>
            <input type="file" name="img" onChange={handleImageChange} />
            {imagePreview && <img src={imagePreview} alt="Preview" className="profile-img-preview" />}
          </>
        ) : (
          <img src={profile.img} alt={profile.name} className="profile-img" />
        )}
      </div>
      <div className="profile-info">
        <label>Name: </label>
        {isEditing ? (
          <input type="text" name="name" value={profile.name} onChange={handleChange} />
        ) : (
          <span>{profile.name}</span>
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
        <label>Description: </label>
        {isEditing ? (
          <textarea name="description" value={profile.description} onChange={handleChange} />
        ) : (
          <span>{profile.description}</span>
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
