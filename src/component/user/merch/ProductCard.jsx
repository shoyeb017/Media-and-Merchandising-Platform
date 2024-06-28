import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product }) => {
    return (
    <Link to={`/product/${product.id}`} className="link-product-card">
    <div className="product-card">
      <img src={product.img} alt={product.name} className="product-img" />

        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">${product.price}</p>
    </div>

    </Link>
  );
};

export default ProductCard;
