import React, { useState, useEffect } from "react";
import "./ViewRole.css";
import AddRole from "./AddRole.jsx";

const roleTypes = ["DIRECTOR", "WRITER", "ACTOR", "ACTRESS"];

const AdminRoleCard = ({ role }) => {
  return (
    <div className="admin-role-card">
      <img src={role.IMG} alt={role.NAME} className="admin-role-img" />
      <div className="admin-role-info">
        <h4>{role.NAME}</h4>
        <p>{role.ROLE_TYPE}</p>
      </div>
    </div>
  );
};

function ViewRole() {
  const [roles, setRoles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRoleTypes, setSelectedRoleTypes] = useState([]); // Handle multiple role types

  // Add state to manage AddRole modal visibility
  const [isAddRoleOpen, setIsAddRoleOpen] = useState(false);

  const handleAddRoleClick = () => {
    setIsAddRoleOpen(true);
  };

  const handleCloseAddRole = () => {
    setIsAddRoleOpen(false);
  };

  useEffect(() => {
    const fetchRolelist = async () => {
      try {
        const response = await fetch("http://localhost:5000/roles", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
          const data = await response.json();
          setRoles(data);
        } else {
          alert("Failed to fetch rolelist");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchRolelist();
  }, []);

  // Toggle role type selection
  const handleRoleTypeClick = (type) => {
    if (selectedRoleTypes.includes(type)) {
      setSelectedRoleTypes(selectedRoleTypes.filter((t) => t !== type));
    } else {
      setSelectedRoleTypes([...selectedRoleTypes, type]);
    }
  };

  // Function to filter roles by both search query and selected role types
  const filteredRoles = roles.filter((role) => {
    const matchesSearchQuery = role.NAME.toLowerCase().includes(
      searchQuery.toLowerCase()
    );
    const matchesRoleType = selectedRoleTypes.length
      ? selectedRoleTypes.includes(role.ROLE_TYPE)
      : true;
    return matchesSearchQuery && matchesRoleType;
  });

  return (
    <div className="rolelist-section">
      <div className="rolelist-section-header">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search for Roles...."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="rolelist-section-header-search-bar"
        />

        {/* Role Type Buttons */}
        <p className="role-type22-title">Role Types:</p>
        <div className="role-type22-buttons">
          {roleTypes.map((type) => (
            <button
              key={type}
              className={`role-type22-btn ${
                selectedRoleTypes.includes(type) ? "selected" : ""
              }`}
              onClick={() => handleRoleTypeClick(type)}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Trigger Add Role Modal */}
      <div className="view-role-add-role-button" onClick={handleAddRoleClick}>
        <i className="fa-solid fa-user-plus"></i> Add Role
      </div>

      {/* Display Filtered Roles */}
      <div className="rolelist-list">
        {filteredRoles.map((role) => (
          <AdminRoleCard key={role.ROLE_ID} role={role} />
        ))}
      </div>

      {/* AddRole modal */}
      {isAddRoleOpen && <AddRole onClose={handleCloseAddRole} />}
    </div>
  );
}

export default ViewRole;
