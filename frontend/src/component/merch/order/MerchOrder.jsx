import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./MerchOrder.css";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [productDetails, setProductDetails] = useState({});
  const [userDetails, setUserDetails] = useState({});
  const navigate = useNavigate();

  // Fetch orders from the server
  const fetchOrders = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/merchandiser/orderlist",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id: localStorage.getItem("user_id") }),
        }
      );
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

  // Handle status updates
  const handleStatusUpdate = async (
    order_date,
    order_time,
    user_id,
    newStatus
  ) => {
    try {
      console.log("Updating order status:", {
        order_date,
        order_time,
        user_id,
        newStatus,
      });
      const response = await fetch(
        "http://localhost:5000/merchandiser/order/update",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            order_date: order_date,
            order_time: order_time,
            user_id: user_id,
            status: newStatus,
          }),
        }
      );

      if (response.ok) {
        // Refresh the orders list
        fetchOrders();
        console.log("Status updated successfully");
        alert("Status updated successfully");
      } else {
        console.error("Failed to update status:", await response.text());
      }
    } catch (error) {
      console.error("Error updating status:", error);
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

  return (
    <div>
      <h3 className="title-order">My Orders</h3>
      <div className="order-requests">
        {orders.length > 0 ? (
          <ul className="order-list">
            {orders.map((order) => (
              <li
                key={order.ORDER_ID}
                className={`order-item ${order.DELIVERY_STATUS.toLowerCase()}`}
              >
                <div className="order-details1">
                  <div className="order-details1-upper">
                    {order.DELIVERY_STATUS === "PENDING" ? (
                      <div className="order-details1-status">
                        <i className="fa fa-clock"></i>
                        <strong>PENDING</strong>
                      </div>
                    ) : order.DELIVERY_STATUS === "PROCESSING" ? (
                      <div className="order-details1-status">
                        <i className="fa fa-truck"></i>
                        <strong>PROCESSING</strong>
                      </div>
                    ) : order.DELIVERY_STATUS === "SHIPPED" ? (
                      <div className="order-details1-status">
                        <i className="fa fa-truck"></i>
                        <strong>SHIPPED</strong>
                      </div>
                    ) : (
                      <div className="order-details1-status">
                        <i className="fa fa-check"></i>
                        <strong>DELIVERED</strong>
                      </div>
                    )}
                  </div>
                  <div className="order-details1-lower">
                    <p className="order-details1-lower-date">
                      {order.ORDER_DATE} {order.ORDER_TIME}
                    </p>
                    <p className="order-details1-lower-price">
                      Total: $
                      {calculateTotalPrice(order.ORDER_DETAILS).toFixed(2)}{" "}
                    </p>
                  </div>
                </div>

                <div className="order-details2">
                  <div className="order-details2-upper">
                    <h2 className="order-details2-upper-title">
                      Customer Details{" "}
                    </h2>
                    <p>
                      <strong>Order Date:</strong>{" "}
                      <span className="order-details2-label">
                        {order.ORDER_DATE} {order.ORDER_TIME}
                      </span>
                    </p>
                    <p>
                      <strong>User Name:</strong> {userDetails.NAME}
                    </p>
                    <p>
                      <strong>Phone:</strong> {userDetails.PHONE}
                    </p>
                    <p>
                      <strong>Email:</strong> {userDetails.EMAIL}
                    </p>
                    <p>
                      <strong>Address:</strong>{" "}
                      {`${userDetails.HOUSE}, ${userDetails.STREET}, ${userDetails.CITY}`}
                    </p>
                  </div>
                  <div className="order-details2-lower">
                    <h2 className="order-details2-upper-title">Products</h2>
                    <ul className="product-details-list">
                      {order.ORDER_DETAILS.split(", ").map((detail) => {
                        const [productId, quantity] = detail.split(" (x");
                        const cleanQuantity = quantity.replace(")", "");
                        const product = productDetails[productId];
                        return (
                          <li key={productId} className="product-detail-item">
                            <img
                              src={product?.IMAGE}
                              alt={product?.NAME}
                              className="product-detail-image"
                            />
                            <div className="product-detail-info">
                              <p>
                                <strong>Product Name:</strong> {product?.NAME}
                              </p>
                              <p>
                                <strong>Quantity:</strong> {cleanQuantity}
                              </p>
                              <p>
                                <strong>Price:</strong> ${product?.PRICE}
                              </p>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
                {/* <div className="order-details3">
                  <button className="order-details3-button" onClick={() => navigate(`/product/${order.PRO_ID}`)}>
                    <i className="fa fa-info-circle"></i>
                    <p>View Product</p>
                  </button>
                </div> */}
                <div className="order-details4">
                  {order.DELIVERY_STATUS === "PENDING" && (
                    <button
                      className="order-details4-button"
                      onClick={() =>
                        handleStatusUpdate(
                          order.ORDER_DATE,
                          order.ORDER_TIME,
                          order.USER_ID,
                          "PROCESSING"
                        )
                      }
                    >
                      <i className="fa fa-check"></i>
                      <p>PROCESSING</p>
                    </button>
                  )}
                  {order.DELIVERY_STATUS === "PROCESSING" && (
                    <button
                      className="order-details4-button"
                      onClick={() =>
                        handleStatusUpdate(
                          order.ORDER_DATE,
                          order.ORDER_TIME,
                          order.USER_ID,
                          "SHIPPED"
                        )
                      }
                    >
                      <i className="fa fa-check"></i>
                      <p>Shipped</p>
                    </button>
                  )}
                  {order.DELIVERY_STATUS === "SHIPPED" && (
                    <button
                      className="order-details4-button"
                      onClick={() =>
                        handleStatusUpdate(
                          order.ORDER_DATE,
                          order.ORDER_TIME,
                          order.USER_ID,
                          "DELIVERED"
                        )
                      }
                    >
                      <i className="fa fa-check"></i>
                      <p>Delivered</p>
                    </button>
                  )}

                  <button
                    className="order-details4-button"
                    onClick={() =>
                      handleCancel(
                        order.ORDER_DATE,
                        order.ORDER_TIME,
                        order.USER_ID
                      )
                    }
                  >
                    <i className="fa fa-times"></i>
                    <p>Cancel</p>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No orders.</p>
        )}
      </div>
    </div>
  );
};

export default Order;
