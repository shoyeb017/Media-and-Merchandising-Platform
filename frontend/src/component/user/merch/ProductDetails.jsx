import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ReviewCard from "./ReviewCard";
import "./ProductDetails.css";

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
  const [username, setUsername] = useState("");
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
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
        const response = await fetch("http://localhost:5000/products/details", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: productId }),
        });
        if (!response.ok) {
          throw new Error("Failed to fetch product details");
        }
        const product = await response.json();
        setProduct(product);
      } catch (err) {
        console.error("Failed to fetch product details:", err);
      }
    };
    fetchProductDetails();
  }, [productId]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("http://localhost:5000/products/review", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: productId }),
        });
        if (!response.ok) {
          throw new Error("Failed to fetch reviews");
        }
        const reviews = await response.json();
        setReviews(reviews);
      } catch (err) {
        console.error("Failed to fetch reviews:", err);
      }
    };
    fetchReviews();
  }, [productId]);

  const [reviews, setReviews] = useState(product ? product.reviews : []);

  const onAddToCart = (product, quantity) => {
    if (quantity <= 0) {
      alert("Please select a quantity greater than 0");
      return;
    }

    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const cartItem = { ...product, quantity };
    cartItems.push(cartItem);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
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

  if (!product) return <div style={{ color: "white" }}>Product not found</div>;

  const StarIcon = ({
    filled,
    size = 24,
    color = "#ff640a",
    strokeColor = "#ffffff",
  }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={size}
      viewBox="0 0 24 24"
      width={size}
      fill={filled ? color : "none"} // Fill only if star is filled
      stroke={filled ? color : strokeColor} // Stroke color changes based on filled state
      strokeWidth={2} // Increase stroke width for a thicker edge
      strokeLinecap="round"
      //   strokeLinejoin="round"
      style={{ marginRight: "5px" }} // Adjust spacing between stars
    >
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  );

  return (
    <div className="product-details">
      <div className="product-details-right-left-side">
        <img
          src={product.IMAGE}
          alt={product.NAME}
          className="product-details-img11"
        />
        <div className="product-details-right-side">
          <div className="product-details-info11">
            {/* <Link to={`/${username}/merch/cart`} className="cart-button11">
              View Cart
            </Link> */}
            <h2 className="product-details-name11">{product.NAME}</h2>
            <div style={{ display: "flex", alignItems: "center" }}>
              {Array.from({ length: 5 }, (_, index) => {
                const starValue = index + 1;
                return (
                  <StarIcon
                    key={index}
                    filled={product.RATING / 2 >= starValue}
                    size={21} // Adjust this for star size
                    color="#ff640a"
                  />
                );
              })}
              <p className="product-details-avg11">
                {" "}
                Average Rating:{" "}
                <strong>{(product.RATING / 2).toFixed(1)} </strong>
              </p>
            </div>

            <p className="product-details-price11">${product.PRICE}</p>
            <p className="product-details-description11">
              {product.DESCRIPTION}
            </p>

            {product.QUANTITY > 0 ? (
              <div className="quantity-add-to-cart">
                <div className="quantity-selector">
                  <button
                    className="quantity-selector-plus-minus"
                    onClick={() => handleQuantityChange(-1)}
                  >
                    -
                  </button>
                  <p>{quantity}</p>
                  <button
                    className="quantity-selector-plus-minus"
                    onClick={() => handleQuantityChange(1)}
                  >
                    +
                  </button>
                </div>
                <button
                  className="quantity-selector-add-to-cart"
                  onClick={() => onAddToCart(product, quantity)}
                >
                  Add to Cart
                </button>
              </div>
            ) : (
              <p className="out-of-stock">Out of Stock</p>
            )}
          </div>

          <div className="reviews-section1111">
            <h3 className="review-rating-title1111">Reviews & Rating</h3>
            <div className="review-rating-all1111">
              {reviews.length > 0 ? (
                reviews.map((review, index) => (
                  <ReviewCard key={index} review={review} />
                ))
              ) : (
                <p style={{ marginLeft: "20px", color: "white" }}>
                  No review is given yet. Be the first one!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
