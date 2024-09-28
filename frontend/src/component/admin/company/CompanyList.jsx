import React, { useState, useEffect } from "react";
import "./CompanyList.css";

const CompanyListCard = ({ data }) => {
  return (
    <div className="companylist-card">
      <h3 className="companylist-card-username">{data.USER_NAME}</h3>
      <img className="companylist-card-img" src={data.IMG} alt={data.NAME} />
      <h3 className="companylist-card-name">{data.NAME}</h3>
      <p className="companylist-card-email">{data.EMAIL}</p>
    </div>
  );
};

function CompanyList() {
  const [company, setCompany] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchUserlist = async () => {
      try {
        const response = await fetch("http://localhost:5000/companylist", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
          const data = await response.json();
          setCompany(data);
        } else {
          alert("Failed to fetch companylist");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchUserlist();
  }, []);
  const filteredusers = company.filter((data) =>
    data.USER_NAME.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="companylist-section">
      <div className="companylist-section-header">
        <input
          type="text"
          placeholder="Search for merchandiser...."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="companylist-section-header-search-bar"
        />
        {/* <button className="search-button">Search</button> */}
      </div>

      <div className="companylist-list">
        {filteredusers.map((data) => (
          <CompanyListCard key={data.COM_ID} data={data} />
        ))}
      </div>
    </div>
  );
}

export default CompanyList;
