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
    <Link to={`/${username}/product/${product.id}`} className="link-product-card">
    <div className="product-card">
      <img src={product.img} alt={product.name} className="product-img" />

        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">${product.price}</p>
    </div>

    </Link>
  );
};

export default ProductCard;
