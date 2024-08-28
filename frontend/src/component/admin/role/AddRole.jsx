import React, { useState } from 'react';
import { ref, uploadBytes, getDownloadURL, storage } from '../../../firebase';
import { v4 } from "uuid";
import './AddRole.css';

const AddRole = () => {
  const [roleData, setRoleData] = useState({
    name: '',
    roleType: '',
    img: null,
    imgUrl: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoleData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      setRoleData(prevData => ({
        ...prevData,
        img: image
      }));

      const reader = new FileReader();
      reader.onload = () => {
        setRoleData(prevData => ({
          ...prevData,
          imgUrl: reader.result
        }));
      };
      reader.readAsDataURL(image);
    }
  };

  const validateForm = () => {
    const { name, roleType, img } = roleData;
    if (!name || !roleType || !img) {
      alert('Please fill out all fields.');
      return false;
    }
    return true;
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (!roleData.img) {
      alert('Please upload an image.');
      return;
    }

    try {
      // Upload the image and get the URL
      const imageRef = ref(storage, `roles/${roleData.img.name + v4()}`);
      await uploadBytes(imageRef, roleData.img);
      const url = await getDownloadURL(imageRef);
      console.log("Image URL:", url);

      // Construct the data to be sent to the server
      const updatedFormData = {
        name: roleData.name,
        roleType: roleData.roleType,
        imgUrl: url, // Include the uploaded image URL
      };

      console.log('Form data:', updatedFormData);

      // Send the form data to the backend
      const response = await fetch('http://localhost:5000/admin/addrole', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedFormData),
      });

      if (response.status === 201) {
        setRoleData({
          name: '',
          roleType: '',
          img: null,
          imgUrl: ''
        });
        alert('Role added successfully!');
        // window.location.reload();
      } else {
        const errorData = await response.json();
        console.error('Error during adding:', errorData);
        alert('An error occurred during adding. Please try again.');
      }
    } catch (error) {
      console.error('Error during adding:', error);
      alert('An error occurred during adding. Please try again.');
    }
  };

  return (
    <div>
      <h3 className="title-addrole">Add Role</h3>
      <div className="role-form">
        <form>
          <div className="form-group">
            <label>Name:</label>
            <input type="text" name="name" value={roleData.name} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Role Type:</label>
            <select name="roleType" value={roleData.roleType} onChange={handleChange}>
              <option value="">Select Role Type</option>
              <option value="DIRECTOR">Director</option>
              <option value="PRODUCER">Producer</option>
              <option value="WRITER">Writer</option>
              <option value="ACTOR">Actor</option>
              <option value="ACTRESS">Actress</option>
            </select>
          </div>

          <label className="upload-image-label">Upload Image:</label>
          <div className="image-upload">
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {roleData.imgUrl && <img src={roleData.imgUrl} alt="Preview" className="image-preview" />}
          </div>

          <button className="submit-button" type="button" onClick={handleUpload}>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddRole;
