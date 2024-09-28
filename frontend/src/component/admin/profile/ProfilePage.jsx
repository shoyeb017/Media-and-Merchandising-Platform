import React, { useState, useEffect } from "react";
import "./ProfilePage.css";
import pro1 from "./pro.jpeg";

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    NAME: "",
    DOB: "",
    EMAIL: "",
    CITY: "",
    STREET: "",
    HOUSE: "",
    PHONE: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("http://localhost:5000/profile/admin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id: localStorage.getItem("user_id") }),
        });
        if (response.status === 200) {
          const data = await response.json();
          setProfile(data);
        } else {
          alert("Failed to fetch profile");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleUpdate = async () => {
    // Handle the update logic (e.g., save the updated profile to a server)
    console.log("Updated Profile:", profile);
    setIsEditing(false);

    try {
      const updatedProfile = {
        ...profile,
        user_id: localStorage.getItem("user_id"),
      };

      const response = await fetch(
        "http://localhost:5000/profile/admin/update",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedProfile),
        }
      );

      const data = await response.json();

      if (response.status === 200) {
        setProfile(data);
        alert("Profile updated successfully!");
      } else {
        alert(data.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while updating the profile");
    }
  };

  return (
    <div className="profile-page1">
      {/* <h2>Profile</h2> */}
      <img src={pro1} className="profile-page1-Profile" />
      <i class="fa fa-user-circle"></i>
      <div className="profile-info2-container">
        <div className="profile-info2">
          <label>Name: </label>
          {isEditing ? (
            <input
              type="text"
              name="NAME"
              value={profile.NAME}
              onChange={handleChange}
            />
          ) : (
            <span>{profile.NAME}</span>
          )}
        </div>
        <div className="profile-info2">
          <label>Date of Birth: </label>
          {isEditing ? (
            <input
              type="date"
              name="DOB"
              value={profile.DOB.split("T")[0]}
              onChange={handleChange}
            />
          ) : (
            <span>{profile.DOB.split("T")[0]}</span>
          )}
        </div>
        <div className="profile-info2">
          <label>Email: </label>
          {isEditing ? (
            <input
              type="email"
              name="EMAIL"
              value={profile.EMAIL}
              onChange={handleChange}
            />
          ) : (
            <span>{profile.EMAIL}</span>
          )}
        </div>
        <div className="profile-info2">
          <label>City: </label>
          {isEditing ? (
            <input
              type="text"
              name="CITY"
              value={profile.CITY}
              onChange={handleChange}
            />
          ) : (
            <span>{profile.CITY}</span>
          )}
        </div>
        <div className="profile-info2">
          <label>Street: </label>
          {isEditing ? (
            <input
              type="text"
              name="STREET"
              value={profile.STREET}
              onChange={handleChange}
            />
          ) : (
            <span>{profile.STREET}</span>
          )}
        </div>
        <div className="profile-info2">
          <label>House: </label>
          {isEditing ? (
            <input
              type="text"
              name="HOUSE"
              value={profile.HOUSE}
              onChange={handleChange}
            />
          ) : (
            <span>{profile.HOUSE}</span>
          )}
        </div>
        <div className="profile-buttons2">
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
