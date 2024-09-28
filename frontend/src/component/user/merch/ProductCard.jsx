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
  //const username = localStorage.getItem('username');

  
    return (
    <Link to={`/${username}/product/${product.PRO_ID}`} className="link-product-card">
    <div className="product-card1">
      <div className="product-card-inner1"> 
        <img src={product.IMAGE} alt={product.NAME} className="product-card-inner1-img" />
        <div className="product-card-inner1-button">Buy Now</div>
      </div>
      <img src={product.IMAGE} alt={product.NAME} className="product-img" />
      <p className="product-name">{product.NAME}</p>
      <p className="product-price1">${product.PRICE}</p>
    </div>
    </Link>
  );
};

export default ProductCard;
