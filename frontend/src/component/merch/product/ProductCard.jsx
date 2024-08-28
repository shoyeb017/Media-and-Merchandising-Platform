import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product }) => {

  const [username, setUsername] = useState('');
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);
  const username1 = localStorage.getItem('user_id');
  

    return (
    <Link to={`/merchandiser/${username1}/product/${product.PRO_ID}`} className="link-product-card">
    <div className="product-card">
      <img src={product.IMAGE} alt={product.NAME} className="product-img" />

        <h3 className="product-name">{product.NAME}</h3>
        <p className="product-price">${product.PRICE}</p>
    </div>

    </Link>
  );
};

export default ProductCard;
