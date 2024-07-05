import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ProductSection.css';
import ProductCard from './ProductCard';

const ProductSection = ({ products }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredProducts = products.filter(product =>
      product.NAME.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
      <button className="search-button">Search</button>
      <Link to="/merch/cart" className="cart-button1">Cart</Link>
      </div>

      <div className="product-list">
        {filteredProducts.map(product => (
          <ProductCard key={product.PRO_ID} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductSection;
