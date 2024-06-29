import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './CompanySection.css';


const CompanyCard = ({ company }) => {
  return (
    <Link to={`/company/${company.id}`} className="link-product-card">

      <div className="company-card">
        <img className="company-card-img" src={company.img} alt={company.name} />
        <div className="company-card-content">
          <h3 className="company-card-title">{company.name}</h3>
          <p className="company-card-desc">{company.description}</p>
        </div>
      </div>
    </Link>
  );
};


const CompanySection = ({ companies }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCompanies = Array.isArray(companies)
      ? companies.filter(company =>
          company.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : [];

  return (
      <div className="company-section">
          <div className="company-section-header">
              <input
                  type="text"
                  placeholder="Search for companies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-bar"
              />
              <button className="search-button">Search</button>
          </div>

          <div className="company-list">
              {filteredCompanies.map(company => (
                  <CompanyCard key={company.id} company={company} />
              ))}
          </div>
      </div>
  );
};

export default CompanySection;
