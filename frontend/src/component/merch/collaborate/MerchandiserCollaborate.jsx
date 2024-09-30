import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./MerchandiserCollaborate.css";

const MerchandiserCollaborate = () => {
  const [companies, setCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [description, setDescription] = useState("");
  const [isRequestSent, setIsRequestSent] = useState(false);

  const [collaborationsStatus, setCollaborationsStatus] = useState([]);

  const navigate = useNavigate();

  // Function to fetch collaboration status
  const fetchCollaborationsStatus = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/merchandiser/collaborate/status",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ mer_id: localStorage.getItem("user_id") }),
        }
      );
      const data = await response.json();
      setCollaborationsStatus(data);
    } catch (error) {
      console.error("Error fetching collaboration status:", error);
    }
  };

  // Fetch the list of companies from the backend
  const fetchCompanies = async () => {
    try {
      const response = await fetch("http://localhost:5000/companies");
      if (response.ok) {
        const data = await response.json();
        setCompanies(data);
      } else {
        alert("Failed to fetch companies");
      }
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  useEffect(() => {
    fetchCompanies();
    fetchCollaborationsStatus();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCompanySelection = (company) => {
    setSelectedCompany(company);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleRequest = async () => {
    if (!selectedCompany || !description) {
      alert("Please select a company and write a description.");
      return;
    }

    try {
      const requestData = {
        com_id: selectedCompany.COM_ID,
        mer_id: localStorage.getItem("user_id"), // Assuming 'user_id' is stored in localStorage
        description: description,
        status: "WAITING",
      };

      const response = await fetch(
        "http://localhost:5000/merchandiser/collaborate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );

      if (response.status === 201) {
        // setIsRequestSent(true);
        alert("Collaboration request sent successfully!");
      } else {
        alert("Failed to send the request.");
      }
    } catch (error) {
      console.error("Error sending collaboration request:", error);
      alert("An error occurred. Please try again.");
    }

    // Reset the form
    setSelectedCompany(null);
    setDescription("");

    fetchCollaborationsStatus();
  };

  const handleDelete = async (com_id, mer_id) => {
    try {
      const requestData = {
        com_id,
        mer_id,
      };

      const response = await fetch("http://localhost:5000/collaborate/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (response.status === 201) {
        alert("Collaboration delete successfully!");
      } else {
        alert("Failed to delete.");
      }
    } catch (error) {
      console.error("Error sending colaboration delete request :", error);
      alert("An error occurred. Please try again.");
    }

    fetchCollaborationsStatus();
  };

  const filteredCompanies = companies.filter((company) =>
    company.NAME.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h3 className="title-addcollaborate">Collaborate with a Company</h3>
      <div className="collaborate-form">
        <h3>Collaborate with Company</h3>
        <div className="form-group">
          <label>Search Company:</label>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search for a company..."
          />
          <div className="company-list">
            {filteredCompanies.map((company) => (
              <div
                key={company.COM_ID}
                className={`company-item ${
                  selectedCompany && selectedCompany.COM_ID === company.COM_ID
                    ? "selected"
                    : ""
                }`}
                onClick={() => handleCompanySelection(company)}
              >
                {company.NAME}
              </div>
            ))}
          </div>
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            value={description}
            onChange={handleDescriptionChange}
            rows="4"
            placeholder="Write a description..."
          />
        </div>
        <button className="submit-button" onClick={handleRequest}>
          Sent Request
        </button>
      </div>

      <div className="collaborate-requests">
        <h3>All Collaboration Status</h3>
        {collaborationsStatus.length > 0 ? (
          <ul className="collab-list">
            {collaborationsStatus.map((collab) => (
              <li
                key={collab.MER_ID}
                className={`collab-item ${collab.C_STATUS.toLowerCase()}`}
              >
                <div className="collab-details1">
                  {collab.C_STATUS === "WAITING" ? (
                    <div className="collab-details1-status">
                      <i class="fa fa-clock"></i>
                      <strong>WAITING</strong>
                    </div>
                  ) : collab.C_STATUS === "ACCEPTED" ? (
                    <div className="collab-details1-status">
                      <i class="fa fa-check"></i>
                      <strong>ACCEPTED</strong>
                    </div>
                  ) : (
                    <div className="collab-details1-status">
                      <i class="fa fa-times"></i>
                      <strong>REJECTED</strong>
                    </div>
                  )}
                </div>
                <div className="collab-details2">
                  <p>
                    <strong>Merchandiser Name:</strong>
                    <p className="collab-details2-label">{collab.MER_NAME}</p>
                  </p>
                  <p>
                    <strong>Description:</strong>
                    <p className="collab-details2-label">
                      {collab.DESCRIPTION}
                    </p>
                  </p>
                  <p>
                    <strong>Products:</strong>
                    <p className="collab-details2-label">
                      {collab.PRODUCT_COUNT}
                    </p>
                  </p>
                </div>
                <div className="collab-details3">
                  <button
                    class="collab-details3-button"
                    onClick={() => navigate(`details/${collab.COM_ID}`)}
                  >
                    <i class="fa fa-info-circle"></i>
                    <p>View Details</p>
                  </button>
                </div>
                <div className="collab-details4">
                  <button
                    class="collab-details4-button"
                    onClick={() => handleDelete(collab.COM_ID, collab.MER_ID)}
                  >
                    <i class="fa fa-trash"></i>
                    <p>Delete</p>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No collaboration status.</p>
        )}
      </div>
    </div>
  );
};

export default MerchandiserCollaborate;
