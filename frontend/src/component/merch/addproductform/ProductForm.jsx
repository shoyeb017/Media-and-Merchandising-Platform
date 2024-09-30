import React, { useState, useEffect } from 'react';
import { ref, uploadBytes, getDownloadURL, storage } from '../../../firebase';
import { v4 } from "uuid";
import './ProductForm.css';

const ProductForm = () => {
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
    image: null,
    imageUrl: '',
    media: [], // To store selected media
    merchId: ''
  });

  const [mediaData, setMediaData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMedia, setSelectedMedia] = useState([]);

  useEffect(() => {
    const fetchMedias = async () => {
      try {
        const response = await fetch('http://localhost:5000/medias');
        if (response.ok) {
          const data = await response.json();
          setMediaData(data);
        } else {
          alert('Failed to fetch media');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchMedias();
  }, []);

  const filteredMedia = mediaData.filter(media =>
    media.TITLE.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProductData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      setProductData(prevData => ({
        ...prevData,
        image: image
      }));

      const reader = new FileReader();
      reader.onload = () => {
        setProductData(prevData => ({
          ...prevData,
          imageUrl: reader.result
        }));
      };
      reader.readAsDataURL(image);
    }
  };

  const handleMediaSelection = (media) => {
    const newMedia = {
      media_id: media.MEDIA_ID, // Ensure this matches your API response
      title: media.TITLE // Ensure this matches your API response
    };

    setSelectedMedia(prevMedia => {
      if (prevMedia.some(m => m.media_id === media.MEDIA_ID)) {
        return prevMedia; // If already selected, return the current state
      }
      return [...prevMedia, newMedia];
    });
  };

  const removeSelectedMedia = (mediaId) => {
    setSelectedMedia(prevMedia => prevMedia.filter(media => media.media_id !== mediaId));
  };

  const validateForm = () => {
    const { name, description, price, quantity, image } = productData;
    if (!name || !description || !price || !quantity || !image) {
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
  
    if (!productData.image) {
      alert('Please upload an image.');
      return;
    }
  
    try {
      // Upload the image and get the URL
      const imageRef = ref(storage, `products/${productData.image.name + v4()}`);
      await uploadBytes(imageRef, productData.image);
      const url = await getDownloadURL(imageRef);
      console.log("Image URL:", url);
  
      // Create the media array with media_id only
      const mediaArray = selectedMedia.map(media => media.media_id);
  
      // Construct the data to be sent to the server
      const updatedFormData = {
        name: productData.name,
        description: productData.description,
        price: productData.price,
        quantity: productData.quantity,
        image: null,
        imageUrl: url, // Include the uploaded image URL
        media: mediaArray, // Use only media_id for media
        merchId: localStorage.getItem('user_id') // Assuming 'user_id' is stored in localStorage
      };
  
      console.log('Form data:', updatedFormData);
  
      // Send the form data to the backend
      const response = await fetch('http://localhost:5000/addproduct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedFormData),
      });
  
      if (response.status === 201) {
        setProductData({
          name: '',
          description: '',
          price: '',
          quantity: '',
          image: null,
          imageUrl: '',
          media: [],
          merchId: ''
        });
        setSelectedMedia([]);
        setSearchTerm('');
        alert('Product added successfully!');
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
      <h3 className="title-addproduct">Add Product</h3>
      <div className="product-form">
        <form>
          <div className="form-group">
            <label>Name:</label>
            <input type="text" name="name" value={productData.name} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Description:</label>
            <textarea name="description" value={productData.description} onChange={handleChange} rows="4" />
          </div>

          <div className="form-group">
            <label>Price:</label>
            <input type="number" name="price" value={productData.price} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Quantity:</label>
            <input type="number" name="quantity" value={productData.quantity} onChange={handleChange} />
          </div>

          <label className="upload-image-label">Upload Image:</label>
          <div className="image-upload">
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {productData.imageUrl && <img src={productData.imageUrl} alt="Preview" className="image-preview" />}
          </div>

          <div className="media-section">
            <h3 className="media-title">Media</h3>
            <div className="selected-media">
              {selectedMedia.map(media => (
                <div key={media.media_id} className="selected-media-item">
                  {media.title}
                  <button className="remove-media" type="button" onClick={() => removeSelectedMedia(media.media_id)}>X</button>
                </div>
              ))}
            </div>
            <div className="media-search">
              <input
                type="text"
                placeholder="Search media..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <div className="search-results">
                {searchTerm.length > 0 && filteredMedia.length > 0 && filteredMedia.map((media) => (
                  <div key={media.MEDIA_ID} className="media-result" onClick={() => handleMediaSelection(media)}>
                    <img src={media.POSTER} alt={media.TITLE} className="media-thumbnail" />
                    <div className="media-title">{media.TITLE}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button className="submit-button" type="button" onClick={handleUpload}>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
