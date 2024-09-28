import React, { useState, useEffect } from "react";
import "./MerchandiserList.css";

const MerchListCard = ({ data }) => {
  return (
    <div className="merchlist-card">
      <h3 className="merchlist-card-username">{data.USER_NAME}</h3>
      <h3 className="merchlist-card-name">{data.NAME}</h3>
      <p className="merchlist-card-email">{data.EMAIL}</p>
    </div>
  );
};

function MerchandiserList() {
  const [merch, setMerch] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchUserlist = async () => {
      try {
        const response = await fetch("http://localhost:5000/merchlist", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
          const data = await response.json();
          setMerch(data);
        } else {
          alert("Failed to fetch merchlist");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchUserlist();
  }, []);
  const filteredusers = merch.filter((data) =>
    data.USER_NAME.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="merchlist-section">
      <div className="merchlist-section-header">
        <input
          type="text"
          placeholder="Search for merchandiser...."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="merchlist-section-header-search-bar"
        />
        {/* <button className="search-button">Search</button> */}
      </div>

      <div className="merchlist-list">
        {filteredusers.map((data) => (
          <MerchListCard key={data.MER_ID} data={data} />
        ))}
      </div>
    </div>
  );
}

export default MerchandiserList;
