import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product }) => {
    return (
    <Link to={`/product/${product.PRO_ID}`} className="link-product-card">
    <div className="product-card">
      <img src={product.IMAGE} alt={product.NAME} className="product-img" />

        <h3 className="product-name">{product.NAME}</h3>
        <p className="product-price">${product.PRICE}</p>
    </div>

    </Link>
  );
};

export default ProductCard;
