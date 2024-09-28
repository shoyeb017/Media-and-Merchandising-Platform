import React, { useState, useEffect } from "react";
import "./UserList.css";

const UserListCard = ({ data }) => {
  return (
    <div className="userlist-card">
      <h3 className="userlist-card-username">{data.USER_NAME}</h3>
      <h3 className="userlist-card-name">{data.NAME}</h3>
      <p className="userlist-card-email">{data.EMAIL}</p>
    </div>
  );
};

function UserList() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchUserlist = async () => {
      try {
        const response = await fetch("http://localhost:5000/userlist", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        } else {
          alert("Failed to fetch userlist");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchUserlist();
  }, []);
  const filteredusers = users.filter((data) =>
    data.USER_NAME.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="userlist-section">
      <div className="userlist-section-header">
        <input
          type="text"
          placeholder="Search for users...."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="userlist-section-header-search-bar"
        />
        {/* <button className="search-button">Search</button> */}
      </div>

      <div className="userlist-list">
        {filteredusers.map((data) => (
          <UserListCard key={data.USER_ID} data={data} />
        ))}
      </div>
    </div>
  );
}

export default UserList;
