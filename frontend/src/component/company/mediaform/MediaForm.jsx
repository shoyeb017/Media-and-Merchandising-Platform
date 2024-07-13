import React, { useState } from 'react';
import { ref, uploadBytes, getDownloadURL, storage } from '../../../firebase';
import { v4 } from "uuid";
import './MediaForm.css';

// Dummy role data for demonstration
const dummyRoleData = [
  { id: 1, name: 'Actor', imageUrl: '/img/3.jpg' },
  { id: 2, name: 'Actress', imageUrl: '/img/3.jpg' },
  { id: 3, name: 'Director', imageUrl: 'https://example.com/director.jpg' },
  { id: 4, name: 'Producer', imageUrl: 'https://example.com/producer.jpg' },
];

const genres = ['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Historical', 'Horror', 'Magic',
  'Mystery', 'Psychological', 'Romance', 'Sci-Fi', 'Supernatural', 'Sports', 'Thriller', 'Tragedy'];

const MediaForm = () => {
  const [mediaData, setMediaData] = useState({
    title: '',
    description: '',
    type: '',
    selectedGenres: [],
    trailer: '',
    duration: '',
    releaseDate: '',
    episode: '',
    roles: [],
    image: null,
    imageUrl: ''
  });

  const [roleFields, setRoleFields] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setMediaData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleGenreClick = (genre) => {
    setMediaData(prevData => {
      const { selectedGenres } = prevData;
      if (selectedGenres.includes(genre)) {
        return { ...prevData, selectedGenres: selectedGenres.filter(g => g !== genre) };
      } else {
        return { ...prevData, selectedGenres: [...selectedGenres, genre] };
      }
    });
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      setMediaData(prevData => ({
        ...prevData,
        image: image
      }));

      const reader = new FileReader();
      reader.onload = () => {
        setMediaData(prevData => ({
          ...prevData,
          imageUrl: reader.result
        }));
      };
      reader.readAsDataURL(image);
    }
  };

  const handleSearchChange = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
    if (searchTerm) {
      const filteredRoles = dummyRoleData.filter(role =>
        role.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(filteredRoles);
    } else {
      setSearchResults([]);
    }
  };

  const handleRoleSelection = (role) => {
    const newRole = {
      picture: role.imageUrl,
      pictureUrl: '',
      name: role.name,
      type: ''
    };
    if (!selectedRoles.includes(role.name)) {
      setSelectedRoles(prevRoles => [...prevRoles, role.name]);
      addRoleField(newRole);
    }
  };

  const removeSelectedRole = (roleName) => {
    const updatedRoles = selectedRoles.filter(role => role !== roleName);
    setSelectedRoles(updatedRoles);
    const newRoleFields = roleFields.filter(role => role.name !== roleName);
    setRoleFields(newRoleFields);
  };

  const addRoleField = (role) => {
    const newRoleFields = [...roleFields, role];
    setRoleFields(newRoleFields);
  };

  const validateForm = () => {
    const { title, description, type, trailer, duration, releaseDate, episode, image } = mediaData;
    if (!title || !description || !type || !trailer || !duration || !releaseDate || !episode) {
      alert('Please fill out all fields.');
      return false;
    }
    return true;
  };

  const handleUpload = async (e)  => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (!mediaData.image) {
        alert('Please upload an image.');
        return;
      }

    const imageRef = ref(storage, `media/${mediaData.image.name + v4()}`);
    await uploadBytes(imageRef, mediaData.image);
    const url = await getDownloadURL(imageRef);
    console.log("url link----->" + url);

    setMediaData({
      title: '',
      description: '',
      type: '',
      selectedGenres: [],
      trailer: '',
      duration: '',
      releaseDate: '',
      episode: '',
      roles: [],
      image: null,
      imageUrl: ''
    });
    setRoleFields([]);
    setSearchTerm('');
    setSearchResults([]);
    setSelectedRoles([]);

    alert('Media uploaded successfully!');
    window.location.reload();
  };

  return (
    <div>
      <div className="addmedia-container"></div>
      <h3 className="title-addmedia">Add Media</h3>
      <div className="media-form">
        <form>
          <div className="form-group">
            <label>Title:</label>
            <input type="text" name="title" value={mediaData.title} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Description:</label>
            <textarea name="description" value={mediaData.description} onChange={handleChange} rows="4" />
          </div>

          <div className="form-group">
            <label>Type:</label>
            <input type="text" name="type" value={mediaData.type} onChange={handleChange} />
          </div>

          <div className="form-group-genre">
            <label>Select genres of this media:</label>
            <div className="genre-buttons">
              {genres.map((genre) => (
                <button
                  key={genre}
                  type="button"
                  className={`genre-button ${mediaData.selectedGenres.includes(genre) ? 'selected' : ''}`}
                  onClick={() => handleGenreClick(genre)}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Trailer Link:</label>
            <input type="text" name="trailer" value={mediaData.trailer} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Duration:</label>
            <input type="text" name="duration" value={mediaData.duration} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Release Date:</label>
            <input type="date" name="releaseDate" value={mediaData.releaseDate} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Episode:</label>
            <input type="text" name="episode" value={mediaData.episode} onChange={handleChange} />
          </div>

          <label className="upload-image-label">Upload Image:</label>
          <div className="image-upload">
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {mediaData.imageUrl && <img src={mediaData.imageUrl} alt="Preview" className="image-preview" />}
          </div>

          <div className="roles-section-company">
            <h3 className="role-title">Roles</h3>
            <div className="selected-roles">
              {selectedRoles.map((roleName) => (
                <span key={roleName} className="selected-role">
                  {roleName}
                  <button
                    type="button"
                    className="remove-role"
                    onClick={() => removeSelectedRole(roleName)}
                  >
                    X
                  </button>
                </span>
              ))}
            </div>
            <div className="role-search">
              <input
                type="text"
                placeholder="Search roles..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <div className="search-results">
                {searchResults.length > 0 && searchResults.map((role) => (
                  <div key={role.id} className="role-result" onClick={() => handleRoleSelection(role)}>
                    <img src={role.imageUrl} alt={role.name} className="role-thumbnail" />
                    <div className="role-name">{role.name}</div>
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

export default MediaForm;
