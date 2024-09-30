import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CompanyCollaborate.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

const CompanyCollaborate = () => {
  const [collaborations, setCollaborations] = useState([]);
  const [collaborationsStatus, setCollaborationsStatus] = useState([]);
  const navigate = useNavigate();

  // Function to fetch collaboration requests
  const fetchCollaborations = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/company/collaborate/show",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ com_id: localStorage.getItem("user_id") }),
        }
      );
      const data = await response.json();
      setCollaborations(data);
    } catch (error) {
      console.error("Error fetching collaboration requests:", error);
    }
  };

  // Function to fetch collaboration status
  const fetchCollaborationsStatus = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/company/collaborate/status",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ com_id: localStorage.getItem("user_id") }),
        }
      );
      const data = await response.json();
      setCollaborationsStatus(data);
    } catch (error) {
      console.error("Error fetching collaboration status:", error);
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchCollaborations();
    fetchCollaborationsStatus();
  }, []);

  // Function to handle status updates
  const handleStatusUpdate = async (mer_id, com_id, newStatus) => {
    try {
      const response = await fetch(
        "http://localhost:5000/company/collaborate/update",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            com_id,
            mer_id,
            status: newStatus,
          }),
        }
      );

      if (response.ok) {
        // Refresh the collaboration requests and status after update
        fetchCollaborations();
        fetchCollaborationsStatus();
        console.log("Status updated successfully");
      } else {
        console.error("Failed to update status:", await response.text());
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
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

  return (
    <div>
      {/* <h3 className="title-collab">Collaboration with Merchandiser</h3> */}
      <div className="collaborate-requests">
        <h3>Collaboration Requests</h3>
        {collaborations.length > 0 ? (
          <ul className="collab-list">
            {collaborations.map((collab) => (
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
                  <p className="collab-details2-label">
                    <span>Merchandiser Name:</span> {collab.MER_NAME}
                  </p>
                  <p className="collab-details2-label">
                    <span>Products:</span> {collab.PRODUCT_COUNT}
                  </p>
                  <p className="collab-details2-label">
                    <span>Description:</span>
                    {collab.DESCRIPTION}
                  </p>
                </div>
                <div className="collab-details3">
                  <button
                    class="collab-details3-button"
                    onClick={() => navigate(`details/${collab.MER_ID}`)}
                  >
                    <i class="fa fa-info-circle"></i>
                    <p>View Details</p>
                  </button>
                </div>
                {collab.C_STATUS === "WAITING" && (
                  <div className="collab-details4">
                    <button
                      class="collab-details4-button"
                      onClick={() =>
                        handleStatusUpdate(
                          collab.MER_ID,
                          localStorage.getItem("user_id"),
                          "ACCEPTED"
                        )
                      }
                    >
                      <i class="fa fa-check"></i>
                      <p>Accept</p>
                    </button>
                    <button
                      class="collab-details4-button"
                      onClick={() =>
                        handleStatusUpdate(
                          collab.MER_ID,
                          localStorage.getItem("user_id"),
                          "REJECTED"
                        )
                      }
                    >
                      <i class="fa fa-times"></i>
                      <p>Reject</p>
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p style={{color:"white"}}>No collaboration requests.</p>
        )}
      </div>

      <div className="collaborate-requests">
        <h3>Collaboration Status</h3>
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
                    onClick={() => navigate(`details/${collab.MER_ID}`)}
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
          <p style={{color:"white"}}>No collaboration status.</p>
        )}
      </div>
    </div>
  );
};

export default CompanyCollaborate;
