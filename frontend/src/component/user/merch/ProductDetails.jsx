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
  const [quantity, setQuantity] = useState(1); // State for product quantity

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

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('http://localhost:5000/products/review', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: productId }),
        });
        if (!response.ok) {
          throw new Error('Failed to fetch reviews');
        }
        const reviews = await response.json();
        setReviews(reviews);
      } catch (err) {
        console.error('Failed to fetch reviews:', err);
      }
    };
    fetchReviews();
  }, [productId]);

  const [reviews, setReviews] = useState(product ? product.reviews : []);

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

  const minQuantity = 1;
  const maxQuantity = product ? product.QUANTITY : 0;

const handleQuantityChange = (change) => {
  setQuantity((prevQuantity) => {
    const newQuantity = prevQuantity + change;
    if (newQuantity < minQuantity) {
      return minQuantity;
    } else if (newQuantity > maxQuantity) {
      return maxQuantity;
    } else {
      return newQuantity;
    }
  });
};

  if (!product) return <div style={{ color: 'white' }}>Product not found</div>;


  

  return (
    <div className="product-details">
      <Link to={`/${username}/merch/cart`} className="cart-button">View Cart</Link>
      <img src={product.IMAGE} alt={product.NAME} className="product-details-img" />
      <div className="product-details-info">
        <h2 className="product-details-name">{product.NAME}</h2>
        <p className="product-details-price">${product.PRICE}</p>
        <p className="product-details-description">{product.DESCRIPTION}</p>

        {product.QUANTITY > 0 ? (
          <div className="quantity-add-to-cart">
            <div className="quantity-selector">
              <button onClick={() => handleQuantityChange(-1)}>-</button>
              <span>{quantity}</span>
              <button onClick={() => handleQuantityChange(1)}>+</button>
            </div>
            <button onClick={() => onAddToCart(product, quantity)}>Add to Cart</button>
          </div>
        ) : (
          <p className="out-of-stock">Out of Stock</p>
        )}
      </div>

      <div className="reviews-section">
        <h3 className="review-rating-title">Reviews & Rating</h3>

        {reviews.map((review, index) => (
          <ReviewCard key={index} review={review} />
        ))}
      </div>
    </div>
  );
};

export default ProductDetails;
