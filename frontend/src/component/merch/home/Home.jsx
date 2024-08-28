import React, { useEffect, useState } from "react";
import ProductCard from '../product/ProductCard.jsx';
import './Home.css';

function Home({}) { // Accept com_id as a prop
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchproduct = async () => {
      try {
        const Response = await fetch('http://localhost:5000/home/myproduct', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ mer_id: localStorage.getItem('user_id') }),
        });
        const product = await Response.json();
        setProducts(product);
      } catch (error) {
        console.error('Error fetching media product:', error);
      }
    };

    fetchproduct();
  }, []);

  return (
    <div>
      <div className="home-container11"></div>
      <h1 className="title-home">WELCOME  TO  MMA  PLATFROM</h1>
      <h1 className="title-home2">⚪ Connecting Media, Driving Merchandising ⚪</h1>
      <div className="mymedia-container">
      <h2 className="title-mymedia">My Product</h2>
        <div className="mymedia-form">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
