// AddRole.js
import React, { useState } from "react";
import { ref, uploadBytes, getDownloadURL, storage } from "../../../firebase";
import { v4 } from "uuid";
import "./AddRole.css";

const AddRole = ({ onClose }) => {
  const [roleData, setRoleData] = useState({
    name: "",
    roleType: "",
    img: null,
    imgUrl: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoleData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      setRoleData((prevData) => ({
        ...prevData,
        img: image,
      }));

      const reader = new FileReader();
      reader.onload = () => {
        setRoleData((prevData) => ({
          ...prevData,
          imgUrl: reader.result,
        }));
      };
      reader.readAsDataURL(image);
    }
  };

  const validateForm = () => {
    const { name, roleType, img } = roleData;
    if (!name || !roleType || !img) {
      alert("Please fill out all fields.");
      return false;
    }
    return true;
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const imageRef = ref(storage, `roles/${roleData.img.name + v4()}`);
      await uploadBytes(imageRef, roleData.img);
      const url = await getDownloadURL(imageRef);

      const updatedFormData = {
        name: roleData.name,
        roleType: roleData.roleType,
        imgUrl: url,
      };

      const response = await fetch("http://localhost:5000/admin/addrole", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFormData),
      });

      if (response.status === 201) {
        setRoleData({ name: "", roleType: "", img: null, imgUrl: "" });
        alert("Role added successfully!");
        onClose(); // Close the modal after successful submission
      } else {
        alert("An error occurred. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="addrole-modal">
      <div className="addrole-modal-content">
        <button className="addrole-close-btn" onClick={onClose}>
        <i class="fa-solid fa-xmark"></i>
        </button>
        <h3 className="title-addrole">Add Role</h3>
        <form onSubmit={handleUpload}>
          <div className="form-group22">
            <p className="form-group22-label">Name</p>
            <input
              type="text"
              name="name"
              value={roleData.name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group22">
            <p className="form-group22-label">Role Type</p>
            <select
              name="roleType"
              value={roleData.roleType}
              onChange={handleChange}
            >
              <option value="">Select Role Type</option>
              <option value="DIRECTOR">Director</option>
              <option value="PRODUCER">Producer</option>
              <option value="WRITER">Writer</option>
              <option value="ACTOR">Actor</option>
              <option value="ACTRESS">Actress</option>
            </select>
          </div>
          <p className="form-group22-label">Upload Image</p>
          <div className="image-upload2">
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {roleData.imgUrl && (
              <img
                src={roleData.imgUrl}
                alt="Preview"
                className="image-preview2"
              />
            )}
          </div>
          <button type="submit" className="submit-button22">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddRole;
