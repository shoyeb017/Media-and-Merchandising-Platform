import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ProductSection.css';
import ProductCard from './ProductCard';

const ProductSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/products', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Something went wrong!');
        }

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on the search query
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
        <Link to={`/${username}/merch/cart`} className="cart-button1">
          <i className="fa fa-shopping-cart"></i> Cart
        </Link>
        <Link to={`/${username}/merch/order`} className="cart-button1">
          <i className="fa fa-list-alt"></i> Order
        </Link>
      </div>

      <div className="product-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <ProductCard key={product.PRO_ID} product={product} />
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default ProductSection;
