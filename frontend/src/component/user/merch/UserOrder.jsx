import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./UserOrder.css";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [productDetails, setProductDetails] = useState({});
  const [userDetails, setUserDetails] = useState({});
  const navigate = useNavigate();

  // Fetch orders from the server
  const fetchOrders = async () => {
    try {
      const response = await fetch("http://localhost:5000/user/orderlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: localStorage.getItem("user_id") }),
      });
      const data = await response.json();
      setOrders(data);

      // Extract product IDs from order details
      const productIds = data.flatMap((order) =>
        order.ORDER_DETAILS.split(", ").map((detail) => detail.split(" (x")[0])
      );

      // Fetch product details based on extracted product IDs
      fetchProductDetails(productIds);

      // Fetch user details
      fetchUserDetails(data[0].USER_ID);

      console.log("Orders:", data);
      console.log("Product IDs:", productIds);
      console.log("Product details:", productDetails);
      console.log("User details:", userDetails);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  // Fetch product details from the server
  const fetchProductDetails = async (productIds) => {
    try {
      const response = await fetch(
        "http://localhost:5000/merchandiser/orderlist/products",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productIds }),
        }
      );
      const data = await response.json();
      const details = data.reduce((acc, product) => {
        acc[product.PRO_ID] = product;
        return acc;
      }, {});
      setProductDetails(details);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  // Fetch user details from the server
  const fetchUserDetails = async (userId) => {
    try {
      const response = await fetch(
        "http://localhost:5000/merchandiser/order/user/details",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id: userId }),
        }
      );
      const data = await response.json();
      setUserDetails(data);
      console.log("User details:", data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  // Handle order cancellation
  const handleCancel = async (order_date, order_time, user_id) => {
    try {
      console.log("Cancelling order status:", {
        order_date,
        order_time,
        user_id,
      });
      const response = await fetch("http://localhost:5000/order/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          order_date: order_date,
          order_time: order_time,
          user_id: user_id,
        }),
      });

      if (response.ok) {
        // Refresh the orders list
        fetchOrders();
        console.log("Order Cancel successfully");
        alert("Order Cancel successfully");
      } else {
        console.error("Failed to Order Cancel :", await response.text());
      }
    } catch (error) {
      console.error("Error Order Cancel:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Calculate total price based on item quantity
  const calculateTotalPrice = (orderDetails) => {
    return orderDetails.split(", ").reduce((total, detail) => {
      const [productId, quantity] = detail.split(" (x");
      const cleanQuantity = parseInt(quantity.replace(")", ""), 10);
      const product = productDetails[productId];
      return total + (product ? product.PRICE * cleanQuantity : 0);
    }, 0);
  };

  const handleAddReview = async () => {
    if (!newReview.description || newReview.rating === 0) {
      alert("Please provide a review and rating");
      return;
    }
    // Implement your logic to handle the review submission, e.g., send the review to the backend
    console.log("Review submitted");

    console.log("description:", newReview.description);
    console.log("rating:", newReview.rating);
    console.log("user_id:", localStorage.getItem("user_id"));
    console.log("product_id:", isReviewVisible);

    try {
      const response = await fetch(
        "http://localhost:5000/products/review/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: localStorage.getItem("user_id"),
            product_id: isReviewVisible,
            description: newReview.description,
            rating: newReview.rating,
          }),
        }
      );

      if (response.ok) {
        // Refresh the reviews list
        console.log("Review added successfully");
        alert("Review added successfully");
      } else {
        console.error("Failed to add review:", await response.text());
      }
    } catch (error) {
      console.error("Error adding review:", error);
    }

    isReviewVisible && setIsReviewVisible(null);
  };

  const [newReview, setNewReview] = useState({
    name: "",
    description: "",
    rating: 0,
  });
  const [isReviewVisible, setIsReviewVisible] = useState(null);

  return (
    <div className="user-order-top-header11">
      {/* <div className="order-container"></div> */}
      
      <div className="order-requests11">
      <h3 className="title-order11">My Orders</h3>
        {orders.length > 0 ? (
          <ul className="order-list11">
            {orders.map((order) => (
              <li
                key={order.ORDER_ID}
                className={`order-item11 ${order.DELIVERY_STATUS.toLowerCase()}`}
              >
                <div className="order-item11-details">
                  <div className="order-item11-details-upper-left">
                    {order.DELIVERY_STATUS === "PENDING" ? (
                      <div className="order-item11-details-upper-left-status">
                        <i className="fa fa-clock"></i>
                        <strong>Pending</strong>
                      </div>
                    ) : order.DELIVERY_STATUS === "PROCESSING" ? (
                      <div className="order-item11-details-upper-left-status">
                        <i className="fa fa-truck"></i>
                        <strong>PRrocessing</strong>
                      </div>
                    ) : order.DELIVERY_STATUS === "SHIPPED" ? (
                      <div className="order-item11-details-upper-left-status">
                        <i className="fa fa-truck"></i>
                        <strong>Shipped</strong>
                      </div>
                    ) : (
                      <div className="order-item11-details-upper-left-status">
                        <i className="fa fa-check"></i>
                        <strong>Delivered</strong>
                      </div>
                    )}
                  </div>
                  <div className="order-item11-details-upper-right">
                    <p className="order-item11-details-upper-right-date">
                      {order.ORDER_DATE} {order.ORDER_TIME}
                    </p>
                    <p className="order-item11-details-upper-right-lower-price">
                      Total: $
                      {calculateTotalPrice(order.ORDER_DETAILS).toFixed(2)}{" "}
                    </p>
                  </div>
                </div>

                <div className="order-item11-details-lower">
                  <div className="order-item11-details-lower-left">
                    <h2 className="order-item11-details-lower-left-title">
                      Customer Details{" "}
                    </h2>
                    <p>
                      Order Date:{" "}
                      <span className="order-item11-details-lower-left-label">
                        {order.ORDER_DATE} {order.ORDER_TIME}
                      </span>
                    </p>
                    <p>
                      User Name{" "}
                      <span className="order-item11-details-lower-left-label">
                        {userDetails.NAME}
                      </span>
                    </p>
                    <p>
                      Phone{" "}
                      <span className="order-item11-details-lower-left-label">
                        {" "}
                        {userDetails.PHONE}{" "}
                      </span>
                    </p>
                    <p>
                      Email
                      <span className="order-item11-details-lower-left-label">
                        {userDetails.EMAIL}
                      </span>
                    </p>
                    <p>
                      Address{" "}
                      <span className="order-item11-details-lower-left-label">{`${userDetails.HOUSE}, ${userDetails.STREET}, ${userDetails.CITY}`}</span>
                    </p>
                  </div>
                  <div className="order-item11-details-lower-right">
                    <h2 className="order-item11-details-lower-right-title">
                      Products
                    </h2>
                    <ul className="order-item11-details-lower-right-product-details-list">
                      {order.ORDER_DETAILS.split(", ").map((detail) => {
                        const [productId, quantity] = detail.split(" (x");
                        const cleanQuantity = quantity.replace(")", "");
                        const product = productDetails[productId];

                        return (
                          <li
                            key={productId}
                            className="order-item11-details-lower-right-product-details-item"
                          >
                            <img
                              src={product?.IMAGE}
                              alt={product?.NAME}
                              className="order-item11-details-lower-right-product-details-item-image"
                            />
                            <div className="order-item11-details-lower-right-product-details-item-info">
                              <p className="order-item11-details-lower-right-product-details-item-info-name">
                                {product?.NAME}
                              </p>
                              <p className="order-item11-details-lower-right-product-details-item-info-qunatity">
                                x{cleanQuantity}
                              </p>
                            </div>
                            <div className="order-item11-details-lower-right-product-details-item-info-2nd">
                              <p>${product?.PRICE}</p>

                              {/* Review Button */}
                              <button
                                onClick={() =>
                                  setIsReviewVisible(
                                    isReviewVisible === productId
                                      ? null
                                      : productId
                                  )
                                }
                                className="review-button"
                              >
                                Review
                              </button>
                            </div>

                            {/* Add Review Section */}
                            <div
                              className={`add-review-floating ${
                                isReviewVisible === productId ? "show" : ""
                              }`}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                }}
                              >
                                <h4
                                  style={{
                                    color: "white",
                                    fontSize: "15px",
                                    fontWeight: "400",
                                  }}
                                >
                                  Add a Review
                                </h4>

                                <i
                                  class="fa-solid fa-xmark"
                                  style={{ color: "white", fontSize: "20px" }}
                                  onClick={() => setIsReviewVisible(null)}
                                ></i>
                              </div>
                              <div className="rating-review-box11">
                                <textarea
                                  placeholder="Your Review"
                                  value={newReview.description}
                                  onChange={(e) =>
                                    setNewReview({
                                      ...newReview,
                                      description: e.target.value,
                                    })
                                  }
                                />
                                <select
                                  value={newReview.rating}
                                  onChange={(e) =>
                                    setNewReview({
                                      ...newReview,
                                      rating: parseInt(e.target.value),
                                    })
                                  }
                                >
                                  {[...Array(11).keys()].map((num) => (
                                    <option key={num} value={num}>
                                      {num}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <button className="rating-review-box11-button" onClick={handleAddReview}>
                                Submit
                              </button>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
                <div className="order-item11-details-lower-bottom">
                  <button
                    className="order-item11-details-lower-bottom-button"
                    onClick={() =>
                      handleCancel(
                        order.ORDER_DATE,
                        order.ORDER_TIME,
                        order.USER_ID
                      )
                    }
                  >
                    <i className="fa fa-times"></i>
                    <p>Delete</p>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p style={{color:"white"}}>No orders.</p>
        )}
      </div>
    </div>
  );
};

export default Order;
