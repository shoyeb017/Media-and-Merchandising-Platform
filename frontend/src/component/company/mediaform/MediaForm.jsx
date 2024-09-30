import React, { useState, useEffect } from "react";
import { ref, uploadBytes, getDownloadURL, storage } from "../../../firebase";
import { v4 } from "uuid";
import "./MediaForm.css";

const genres = [
  "ACTION",
  "ADVENTURE",
  "COMEDY",
  "DRAMA",
  "FANTASY",
  "HISTORICAL",
  "HORROR",
  "MAGIC",
  "MYSTERY",
  "PSYCHOLOGICAL",
  "ROMANCE",
  "SCI-FI",
  "SUPERNATURAL",
  "SPORTS",
  "THRILLER",
  "TRAGEDY",
];

const mediaTypes = ["MOVIE", "TV_SHOW", "DOCUMENTARY", "ANIME"];

const MediaForm = () => {
  const [mediaData, setMediaData] = useState({
    title: "",
    description: "",
    type: "",
    selectedGenres: [],
    trailer: "",
    duration: "",
    releaseDate: "",
    episode: "",
    roles: [],
    imageUrl: "",
    com_id: "",
  });

  const [roleFields, setRoleFields] = useState([]);
  const [roles, setRoles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await fetch("http://localhost:5000/roles", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
          const data = await response.json();
          setRoles(data);
        } else {
          alert("Failed to fetch role");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchRoles();
  }, []);

  const filteredRoles = roles.filter((role) =>
    role.NAME.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
    if (searchTerm) {
      const filteredRoles = dummyRoleData.filter((role) =>
        role.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(filteredRoles);
    } else {
      setSearchResults([]);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setMediaData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleGenreClick = (genre) => {
    setMediaData((prevData) => {
      const { selectedGenres } = prevData;
      if (selectedGenres.includes(genre)) {
        return {
          ...prevData,
          selectedGenres: selectedGenres.filter((g) => g !== genre),
        };
      } else {
        return { ...prevData, selectedGenres: [...selectedGenres, genre] };
      }
    });
  };

  const handleTypeClick = (type) => {
    setMediaData((prevData) => ({
      ...prevData,
      type: prevData.type === type ? "" : type,
    }));
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      setMediaData((prevData) => ({
        ...prevData,
        image: image,
      }));

      const reader = new FileReader();
      reader.onload = () => {
        setMediaData((prevData) => ({
          ...prevData,
          imageUrl: reader.result,
        }));
      };
      reader.readAsDataURL(image);
    }
  };

  const handleRoleSelection = (role) => {
    console.log("Role selected:", role);
    const newRole = {
      role_id: role.ROLE_ID,
      name: role.NAME,
    };

    setSelectedRoles((prevRoles) => {
      if (prevRoles.some((r) => r.role_id === role.ROLE_ID)) {
        return prevRoles; // If yes, return the current state without changes
      }
      const updatedRoles = [...prevRoles, newRole];
      addRoleField(newRole); // Add role to roleFields as well
      return updatedRoles;
    });
    // Note: This console log won't show the updated state immediately due to async nature of setState
    //console.log('Selected roles:', selectedRoles);
  };

  const addRoleField = (role) => {
    setRoleFields((prevFields) => [...prevFields, role]); // Add new role to roleFields
  };

  const removeSelectedRole = (roleId) => {
    setSelectedRoles((prevRoles) =>
      prevRoles.filter((role) => role.role_id !== roleId)
    );
    setRoleFields((prevFields) =>
      prevFields.filter((role) => role.role_id !== roleId)
    );
  };

  const validateForm = () => {
    const {
      title,
      description,
      type,
      trailer,
      duration,
      releaseDate,
      episode,
      image,
    } = mediaData;
    if (
      !title ||
      !description ||
      !type ||
      !trailer ||
      !duration ||
      !releaseDate ||
      !episode
    ) {
      alert("Please fill out all fields.");
      return false;
    }
    return true;
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (!mediaData.image) {
      alert("Please upload an image.");
      return;
    }

    try {
      // Upload the image and get the URL
      const imageRef = ref(storage, `media/${mediaData.image.name + v4()}`);
      await uploadBytes(imageRef, mediaData.image);
      const url = await getDownloadURL(imageRef);
      console.log("url link----->" + url);

      console.log("Selected roles:", selectedRoles);

      const rolesArray = selectedRoles.map((role) => ({
        role_id: role.role_id,
      }));
      const updatedFormData = {
        ...mediaData,
        roles: rolesArray, // Use role_id from the selectedRoles array
        imageUrl: url, // Include the uploaded image URL
        com_id: localStorage.getItem("user_id"),
      };

      console.log("Form data:", updatedFormData);
      console.log("Roles:", rolesArray);

      // Send the form data to the backend
      const response = await fetch("http://localhost:5000/addmedia", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFormData),
      });
      if (response.status === 201) {
        setMediaData({
          title: "",
          description: "",
          type: "",
          selectedGenres: [],
          trailer: "",
          duration: "",
          releaseDate: "",
          episode: "",
          roles: [],
          image: null,
          imageUrl: "",
          com_id: "",
        });
        setRoleFields([]);
        setSearchTerm("");
        setSearchResults([]);
        setSelectedRoles([]);

        alert("Media Added successful!");
        // window.location.reload();
      } else {
        // Check if the response has content
        if (response.headers.get("Content-Length") > "0") {
          const errorData = await response.json();
          console.error("Error during adding:", errorData);
          alert("An error occurred during adding. Please try again.");
        } else {
          // Handle case where there is no response body
          console.error("Error during adding: No response body");
          alert("An error occurred during adding. No details available.");
        }
      }
    } catch (error) {
      console.error("Error during adding:", error);
      alert("An error occurred during adding. Please try again.");
    }
  };

  return (
    <div>
      <h3 className="title-addmedia">Add Media</h3>
      <div className="media-form">
        <form>
          <div className="form-group2">
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={mediaData.title}
              onChange={handleChange}
            />
          </div>

          <div className="form-group2">
            <label>Description:</label>
            <textarea
              name="description"
              value={mediaData.description}
              onChange={handleChange}
              rows="4"
            />
          </div>

          <div className="form-group2-genre">
            <label>Type:</label>
            <div className="genre-buttons2">
              {mediaTypes.map((type) => (
                <button
                  key={type}
                  type="button"
                  className={`genre-button2 ${
                    mediaData.type === type ? "selected" : ""
                  }`}
                  onClick={() => handleTypeClick(type)}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="form-group2-genre">
            <label>Select genres of this media:</label>
            <div className="genre-buttons2">
              {genres.map((genre) => (
                <button
                  key={genre}
                  type="button"
                  className={`genre-button2 ${
                    mediaData.selectedGenres.includes(genre) ? "selected" : ""
                  }`}
                  onClick={() => handleGenreClick(genre)}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>

          <div className="form-group2">
            <label>Trailer Link:</label>
            <input
              type="text"
              name="trailer"
              value={mediaData.trailer}
              onChange={handleChange}
            />
          </div>

          <div className="form-group2">
            <label>Duration:</label>
            <input
              type="number"
              name="duration"
              value={mediaData.duration}
              onChange={handleChange}
            />
          </div>

          <div className="form-group2">
            <label>Release Date:</label>
            <input
              type="date"
              name="releaseDate"
              value={mediaData.releaseDate}
              onChange={handleChange}
            />
          </div>

          <div className="form-group2">
            <label>Episode:</label>
            <input
              type="number"
              name="episode"
              value={mediaData.episode}
              onChange={handleChange}
            />
          </div>

          <label className="upload-image-label2">Upload Image:</label>
          <div className="image-upload2">
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {mediaData.imageUrl && (
              <img
                src={mediaData.imageUrl}
                alt="Preview"
                className="image-preview"
              />
            )}
          </div>

          <div className="roles-section-company">
            <h3 className="role-title">Roles</h3>
            <div className="selected-roles">
              {selectedRoles.map((role) => (
                <div key={role.role_id} className="selected-role">
                  {role.name}
                  <button
                    className="remove-role"
                    type="button"
                    onClick={() => removeSelectedRole(role.role_id)}
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
            <div className="role-search">
              <input
                type="text"
                placeholder="Search roles..."
                value={searchTerm}
                // onChange={handleSearchChange}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="search-results">
                {searchTerm.length > 0 &&
                  filteredRoles.length > 0 &&
                  filteredRoles.map((role) => (
                    <div
                      key={role.ROLE_ID}
                      className="role-result"
                      onClick={() => handleRoleSelection(role)}
                    >
                      <img
                        src={role.IMG}
                        alt={role.NAME}
                        className="role-thumbnail"
                      />
                      <div className="role-name">{role.NAME}</div>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <button
            className="submit-button2"
            type="button"
            onClick={handleUpload}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default MediaForm;
