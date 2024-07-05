import React from 'react';
import { useParams, Link } from 'react-router-dom';
import NewsCard from './NewsCard';
import ProductCard from '../merch/ProductCard';
import './CompanyDetailsPage.css';

const CompanyDetailsPage = ({ companies, products }) => {
  const { companyID } = useParams();
  const company = companies.find(p => p.COM_ID === parseInt(companyID));

  if (!company) {
    return <div className="error">Loading...</div>; // Or handle the case where company is not found
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

      {/* Product & news section */}
      <div className="company-details-middle">
        <div className="products-section">
          <h3 className="products-title">Advertisement</h3>
          <div className="product-list">
            {Array.isArray(company.productId) && company.productId.map(productId => {
              const product = products.find(p => p.COM_ID === productId);
              if (product) {
                return <ProductCard key={product.COM_ID} product={product} />;
              }
              return null; // Handle case where product is not found
            })}
          </div>
        </div>

        <div className="news-section">
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
