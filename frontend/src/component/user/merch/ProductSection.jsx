import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ProductSection.css';
import ProductCard from './ProductCard';

const ProductSection = ({ products }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredProducts = products.filter(product =>
      product.name.toLowerCase())
  

    const [username, setUsername] = useState('');
    useEffect(() => {
      const storedUsername = localStorage.getItem('username');
      if (storedUsername) {
        setUsername(storedUsername);
      }
    }, []);

  return (
    <div className="product-section">

      <div className="product-section-header">
      <input
        type="text"
        placeholder="Search for products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-bar"
      />
      <button>Search</button>
      <Link to={`/${username}/merch/cart`} className="cart-button1">Cart</Link>
      </div>

      <div className="product-list">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductSection;
