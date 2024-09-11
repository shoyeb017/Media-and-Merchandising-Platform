import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './ProductDetails.css';


const ReviewCard = ({ review }) => {
  return (
    <div className="review-card">
      <h4 className="review-name">{review.name}</h4>
      <p className="review-desc">{review.description}</p>
      <p className="review-rating">Rating: {review.rating}/5</p>
    </div>
  );
};



const ProductDetails = ({}) => {

  const { productID } = useParams();
  const [product, setProducts] =useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {

      console.log("productID: ", productID);
        try {
            const response = await fetch('http://localhost:5000/products/details', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: productID }),
            });
            if (!response.ok) {
                throw new Error('Failed to fetch product details');
            }
            const product = await response.json();
            setProducts(product);
        } catch (err) {
            console.error('Failed to fetch product details:', err);
        }
    };
    fetchProductDetails();
}, [productID]);



  const [reviews, setReviews] = useState(product ? product.reviews : []);
  const [newReview, setNewReview] = useState({ name: '', description: '', rating: 0 });


  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('http://localhost:5000/products/review', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: productID }),
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
  }, [productID]);


  if (!product) return <div style={{color: 'white'}}>Product not found</div>;

  return (
    <div className="product-details">

      <img src={product.IMAGE} alt={product.NAME} className="product-details-img" />
      <div className="product-details-info">
        <h2 className="product-details-name">{product.NAME}</h2>
        <p className="product-details-price">${product.PRICE}</p>
        <p className="product-details-description">{product.DESCRIPTION}</p>
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
