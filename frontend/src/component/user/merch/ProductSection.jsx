import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ProductSection.css';
import ProductCard from './ProductCard';

const ProductSection = ({  }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [products, setProducts] = useState([]);  // Initialize with useState

    
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
                    }
                });
                
                if (!response.ok) {
                  throw new Error('Something went wrong!');
                }
                
                const data = await response.json();
                setProducts(data);  // Set the fetched data to the products state
              } catch (error) {
                console.error(error);
              }
            };
            
            fetchProducts();
          }, []);
          
          // const filteredProducts = products.filter(product =>
          //   product.name.toLowerCase().includes(searchQuery.toLowerCase())
          // );
          
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
        {products.map(product => (
          <ProductCard key={product.PRO_ID} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductSection;
