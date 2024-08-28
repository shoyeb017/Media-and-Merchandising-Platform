import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './CollabDetails.css';

const ProductCard = ({ product }) => {

    // const [username, setUsername] = useState('');
    // useEffect(() => {
    //   const storedUsername = localStorage.getItem('username');
    //   if (storedUsername) {
    //     setUsername(storedUsername);
    //   }
    // }, []);
    //const username = localStorage.getItem('username');
  
      return (
    //   <Link to={`/${username}/product/${product.PRO_ID}`} className="link-product-card">
      <div className="product-card">
        <img src={product.IMAGE} alt={product.NAME} className="product-img" />
  
          <h3 className="product-name">{product.NAME}</h3>
          <p className="product-price">${product.PRICE}</p>
      </div>
  
    //   </Link>
    );
  };


const CollabDetails = () => {
  const { com_id } = useParams();
  const [collabDetails, setCollabDetails] = useState(null);

  const fetchCollabDetails = async () => {
    console.log('com_id:', com_id);
    try {
      const response = await fetch('http://localhost:5000/company/collaborate/details', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          com_id,
          mer_id: localStorage.getItem('user_id') 
        }),
      });
      const data = await response.json();
      setCollabDetails(data);
      console.log('Collaboration details:', data);
    } catch (error) {
      console.error('Error fetching collaboration details:', error);
    }
  };

  useEffect(() => {
    fetchCollabDetails();
  }, [com_id]);

  return (
    <div className="collab-details-page">
      {collabDetails ? (
        <div>
          <div className="collab-details-merchandiser">
            <h2>Merchandiser Details</h2>
            <p className="collab-details-merchandiser-name">{collabDetails.MER_NAME}</p>
            <p className="collab-details-merchandiser-desc">{collabDetails.DESCRIPTION}</p>
          </div> 
          <div className="collab-details-products">
            <h2>Collaboration Products</h2>
            <div className="collab-details-products-item">
            {collabDetails.PRODUCTS.map((product) => (
                        <ProductCard product={product} />
                    ))}
            </div>
          </div> 
        </div>
      ) : (
        <p>Loading details...</p>
      )}
    </div>
  );
};

export default CollabDetails;
