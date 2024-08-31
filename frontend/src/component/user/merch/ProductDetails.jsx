import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReviewCard from './ReviewCard';
import './ProductDetails.css';


// const ReviewCard = ({ review }) => {
//   return (
//     <div className="review-card">
//       <h4 className="review-name">{review.name}</h4>
//       <p className="review-desc">{review.description}</p>
//       <p className="review-rating">Rating: {review.rating}/5</p>
//     </div>
//   );
// };

const ProductDetails = () => {
  const [username, setUsername] = useState('');
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(0); // State for product quantity

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch('http://localhost:5000/products/details', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: productId }),
        });
        if (!response.ok) {
          throw new Error('Failed to fetch product details');
        }
        const product = await response.json();
        setProduct(product);
      } catch (err) {
        console.error('Failed to fetch product details:', err);
      }
    };
    fetchProductDetails();
  }, [productId]);

  const [reviews, setReviews] = useState(product ? product.reviews : []);
  const [newReview, setNewReview] = useState({ name: '', description: '', rating: 0 });

  const handleAddReview = () => {
    if (newReview.description && newReview.rating > 0) {
      setReviews([...reviews, newReview]);
      setNewReview({ name: '', description: '', rating: 0 });
    } else {
      alert('Please fill out all fields and provide a rating.');
    }
  };

  const onAddToCart = (product, quantity) => {
    if (quantity <= 0) {
      alert('Please select a quantity greater than 0');
      return;
    }

    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartItem = { ...product, quantity };
    cartItems.push(cartItem);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    alert(`${quantity} ${product.NAME}(s) has been added to your cart.`);
  };

  const handleQuantityChange = (amount) => {
    setQuantity((prevQuantity) => Math.max(prevQuantity + amount, 0));
  };

  if (!product) return <div style={{color: 'white'}}>Product not found</div>;

  return (
    <div className="product-details">
      <Link to={`/${username}/merch/cart`} className="cart-button">View Cart</Link>
      <img src={product.IMAGE} alt={product.NAME} className="product-details-img" />
      <div className="product-details-info">
        <h2 className="product-details-name">{product.NAME}</h2>
        <p className="product-details-price">${product.PRICE}</p>
        <p className="product-details-description">{product.DESCRIPTION}</p>

        <div className="quantity-selector">
          <button onClick={() => handleQuantityChange(-1)}>-</button>
          <span>{quantity}</span>
          <button onClick={() => handleQuantityChange(1)}>+</button>
        </div>

        <button onClick={() => onAddToCart(product, quantity)}>Add to Cart</button>
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
          <button onClick={handleAddReview}>Submit Review</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
