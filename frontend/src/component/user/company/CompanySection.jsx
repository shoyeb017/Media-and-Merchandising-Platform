import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './CompanySection.css';



const CompanyCard = ({company}) => {

  const [username, setUsername] = useState('');
  useEffect(() => {
  const storedUsername = localStorage.getItem('username');
  if (storedUsername) {
    setUsername(storedUsername);
  }
  }, []);

  return (
    <Link to={`/${username}/company/${company.COM_ID}`} className="link-product-card">
      <div className="company-card">
        <div className="company-card-content-upper">
          <h3 className="company-card-title1">{company.NAME}</h3>
          <h3 className="company-card-email1">{company.EMAIL}</h3>
          <p className="company-card-desc1">{company.DESCRIPTION}</p>
        </div>
        <img className="company-card-img" src={company.IMG} alt={company.NAME} />
        <div className="company-card-content">
          <h3 className="company-card-title">{company.NAME}</h3>
          <h3 className="company-card-email">{company.EMAIL}</h3>
        </div>
      </div>
    </Link>
  );
};

const CompanySection = () => {
  const [companies, setCompanies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetch('http://localhost:5000/companies',
          { 
            method: 'GET',
            headers: { 'Content-Type': 'application/json' } 
          }
        );
        if (response.ok) {
          const data = await response.json();
          setCompanies(data);
        } else {
          alert('Failed to fetch companies');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchCompanies();
  }, []);

  const filteredCompanies = companies.filter(company =>
    company.NAME.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="company-section">
      <div className="company-section-header">
        <input
          type="text"
          placeholder="Search for companies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="company-section-header-search-bar"
        />
        {/* <button className="search-button">Search</button> */}
      </div>

      <div className="company-list11">
        {filteredCompanies.map(company => (
          <CompanyCard key={company.COM_ID} company={company} />
        ))}
      </div>
    </div>
  );
};

export default CompanySection;
