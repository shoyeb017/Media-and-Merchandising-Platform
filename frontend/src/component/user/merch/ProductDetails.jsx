import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReviewCard from './ReviewCard';
import './ProductDetails.css';

const ProductDetails = ({ products, onAddToCart }) => {
  const { productId } = useParams();
  const product = products.find(p => p.PRO_ID === parseInt(productId));

  if (!product) return <div style={{color: 'white'}}>Product not found</div>;

  const [reviews, setReviews] = useState(product.reviews || []);
  const [newReview, setNewReview] = useState({ name: '', description: '', rating: 0 });

  const handleAddReview = () => {
    if (newReview.description && newReview.rating > 0) {
      setReviews([...reviews, newReview]);
      setNewReview({ name: '', description: '', rating: 0 });
    } else {
      alert('Please fill out all fields and provide a rating.');
    }
  };

  return (
    <div className="product-details">
      <Link to="/merch/cart" className="cart-button">View Cart</Link>
      <img src={product.IMAGE} alt={product.NAME} className="product-details-img" />
      <div className="product-details-info">
        <h2 className="product-details-name">{product.NAME}</h2>
        <p className="product-details-price">${product.PRICE}</p>
        <p className="product-details-description">{product.DESCRIPTION}</p>
        <button onClick={() => onAddToCart(product)}>Add to Cart</button>
      </div>

      <div className="reviews-section">
        <h3 className="review-rating-title">Reviews & Rating</h3>

        {reviews.map((review, index) => (
          <ReviewCard key={index} review={review} />
        ))}

        <div className="add-review">
          <h4 style={{ color: 'white' }}>Add a Review</h4>
          <div className="rating-review-box">
            <textarea
              placeholder="Your Review"
              value={newReview.description}
              onChange={(e) => setNewReview({ ...newReview, description: e.target.value })}
            />
            <select
              value={newReview.rating}
              onChange={(e) => setNewReview({ ...newReview, rating: parseInt(e.target.value) })}
            >
              <option value={0}>0</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
          </div>
          {/* <input
            type="text"
            placeholder="Your Name"
            value={newReview.name}
            onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
          /> */}
          <button onClick={handleAddReview}>Submit Review</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
