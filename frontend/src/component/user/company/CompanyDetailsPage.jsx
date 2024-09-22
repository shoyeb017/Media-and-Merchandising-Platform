import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import NewsCard from './NewsCard';
import ProductCard from '../merch/ProductCard';
import './CompanyDetailsPage.css';
import MovieList from '../home/MovieList';

const CompanyDetailsPage = () => {
  const { companyID } = useParams();
  // const { com_id} = useParams();
  const [company, setCompany] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [companyMovies, setCompanyMovies] = useState([]);

  // Fetch company data by ID
  const fetchAdvertisement = async () => {
    const com_id = companyID;
      console.log(com_id);
    try {
      const response = await fetch(`http://localhost:5000/companydetailspage/advertisement`,
        { 
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ com_id })
        }

      );
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      } else {
        console.error('Failed to fetch company data');
      }
      const response2 = await fetch(`http://localhost:5000/companydetailspage/medias`,
        { 
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ com_id })
        }

      );
      if (response2.ok) {
        const data = await response2.json();
        setCompanyMovies(data);
      } else {
        console.error('Failed to fetch company data');
      }
      

    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch company data by ID
    const fetchCompanyData = async () => {

      try {
        const response = await fetch(`http://localhost:5000/companies/page`,
          { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ companyID })
          }

        );
        if (response.ok) {
          const data = await response.json();
          setCompany(data);
        } else {
          console.error('Failed to fetch company data');
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCompanyData();
    fetchAdvertisement();
  }, [companyID]);

  if (loading) {
    return <div className="error">Loading...</div>;
  }

  if (!company) {
    return <div className="error">Company not found.</div>;
  }

  const coverImgStyle = {
    backgroundImage: `url(${company.IMG})`,
    backgroundAttachment: 'fixed',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '100%',
    height: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    <div className="company-details-page">
      <div className="company-details" style={coverImgStyle}>
        <div className="allsection">
          <div className="section1">
            <img src={company.IMG} alt={company.NAME} className="company-img" />
          </div> 
          <div className="section2">
            <h2>{company.NAME}</h2>
            <p>{company.DESCRIPTION}</p>
          </div>
          <div className="section3">
            <p><strong>Email:</strong> {company.EMAIL}</p>
          </div>
        </div>
      </div>
      <div className="company-details-page-medias">
        <MovieList movies={companyMovies} title="Medias" />
      </div>
      {/* Product & news section */}
      <div className="company-details-middle">
        <div className="products-section">
          <h3 className="products-title">Advertisement</h3>
          <div className="product-list">
          {products.map(product => (
          <ProductCard key={product.PRO_ID} product={product} />
        ))}
          </div>
        </div>

        <div className="news-section1">
          <h3>News & Updates</h3>
          <div className="news-list">
            {Array.isArray(company.news) && company.news.map((newsItem, index) => (
              <NewsCard key={index} news={newsItem} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetailsPage;
