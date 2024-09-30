import React, { useState, useEffect } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { storage } from "../../../firebase"; // Make sure to configure and export your Firebase storage instance
import "./ProfilePage.css";

const ProfilePage = () => {
  const initialProfile = {
    IMG: "", // Placeholder image URL
    NAME: "",
    EMAIL: "",
    DESCRIPTION: "",
  };

  const [profile, setProfile] = useState(initialProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [imagePreview, setImagePreview] = useState(initialProfile.IMG);
  const [imageUpload, setImageUpload] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      console.log("Fetching profile data...");
      console.log(
        "USER ID________________________" + localStorage.getItem("user_id")
      );
      try {
        const response = await fetch("http://localhost:5000/profile/company", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userid: localStorage.getItem("user_id") }),
        });
        if (response.status === 200) {
          const data = await response.json();
          setProfile(data);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
    fetchProfileData();
  }, []);

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
      const imageRef = ref(
        storage,
        `company/profile/${imageUpload.name + v4()}`
      );
      await uploadBytes(imageRef, imageUpload);
      const url = await getDownloadURL(imageRef);
      updatedProfile.IMG = url;
      // Clear the image upload state after uploading
      setImageUpload(null);
    }

    // Handle the update logic (e.g., save the updated profile to a server)
    console.log("Updated Profile:", updatedProfile);
    setProfile(updatedProfile);
    setIsEditing(false);
  };

  return (
    <div className="profile-page3">
      {/* <h2>Company Profile</h2> */}
      <div className="profile-info-image">
        {isEditing ? (
          <>
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="profile-img-preview"
              />
            )}
            <input type="file" name="img" onChange={handleImageChange} />
          </>
        ) : (
          <img
            src={profile.IMG}
            alt={profile.NAME}
            className="profile-page3-Profile"
          />
        )}
      </div>
      {isEditing ? null : <i class="fa fa-user-circle"></i>}

      <div className="profile-info3-container">
        <div className="profile-info3">
          <label>Name: </label>
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={profile.NAME}
              onChange={handleChange}
            />
          ) : (
            <span>{profile.NAME}</span>
          )}
        </div>
        <div className="profile-info3">
          <label>Email: </label>
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={profile.EMAIL}
              onChange={handleChange}
            />
          ) : (
            <span>{profile.EMAIL}</span>
          )}
        </div>
        <div className="profile-info3">
          <label>Description: </label>
          {isEditing ? (
            <textarea
              name="description"
              value={profile.DESCRIPTION}
              onChange={handleChange}
            />
          ) : (
            <span>{profile.DESCRIPTION}</span>
          )}
        </div>
        <div className="profile-buttons3">
          {isEditing ? (
            <button onClick={handleUpdate}>Update</button>
          ) : (
            <button onClick={toggleEdit}>Edit</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
