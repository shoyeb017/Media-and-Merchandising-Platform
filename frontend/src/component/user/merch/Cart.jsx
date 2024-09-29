import React, { useState, useEffect } from "react";
import { DateTime } from "luxon";
import "./Cart.css";

const CartCard = ({ item, onCancel }) => {
  return (
    <div className="cart-card">
      <img src={item.IMAGE} alt={item.NAME} className="cart-card-image" />
      <div className="cart-card-details">
        <h4>{item.NAME}</h4>
        <p className="cart-card-details-price">${item.PRICE.toFixed(2)}</p>
        <p className="cart-card-details-quantity">{item.quantity}</p>
      </div>
      <div className="cart-card-total">
        <p className="cart-card-total-total">
          ${(item.PRICE * item.quantity).toFixed(2)}
        </p>
        {/* Delete specific item */}
        <i
          className="fa-solid fa-trash"
          onClick={() => onCancel(item.PRO_ID)}
        ></i>
      </div>
    </div>
  );
};

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  // Load cart items from localStorage on component mount
  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(storedCartItems);
  }, []);

  // Function to handle canceling an item
  const handleCancelItem = (id) => {
    // Filter out only the item with the matching PRO_ID
    console.log("Canceling item with PRO_ID:", id);
    const updatedCartItems = cartItems.filter((item) => item.PRO_ID !== id);
    
    // Update the state and local storage
    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };
  

  const handleConfirmOrder = async () => {
    try {

      // Create a map to store the quantity of each product
      const qtyMap = new Map();

      for (let i = 0; i < cartItems.length; i++) {
        const proId = cartItems[i].PRO_ID;

        // Initialize the quantity in the map to 0 if it's not already set
        if (!qtyMap.has(proId)) {
          qtyMap.set(proId, 0);
        }

        // Get the current quantity from the map and add the quantity from cartItems
        const currentQty = qtyMap.get(proId);
        const cartItemQty = cartItems[i].quantity; // Get the cart quantity

        const newQty = currentQty + cartItemQty; // Add cart quantity to the current quantity

        // Update the map with the new total quantity
        qtyMap.set(proId, newQty);

        console.log(`Updated quantity for product ${proId}:`, qtyMap.get(proId));
      }

      console.log('Final qtyMap:', qtyMap);


      for (let [proId, qty] of qtyMap) {
        const availableqty = await fetch(`http://localhost:5000/user/product/checkqty`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ PRO_ID : proId }),
        });

        if (!availableqty.ok) {
          throw new Error("Failed to check product quantity");
        }

        const data = await availableqty.json();
        console.log('Available quantity:', data);

        const proname = cartItems.find(item => item.PRO_ID === proId).NAME;
        console.log('Product name:', proname);

        if (qty > data[0].QUANTITY) {
          alert(`Not enough quantity available for product ${proname}`);
          return;
        }
      }


      // Get current date and time
      const now = new Date();

      // Format the date and time
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
      const day = String(now.getDate()).padStart(2, "0");
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");

      const orderDate = `${day}-${month}-${year}`;
      const orderTime = `${hours}:${minutes}:${seconds}`;

      // Prepare the order data
      const orderData = {
        user_id: localStorage.getItem("user_id"),
        items: cartItems,
        order_date: orderDate, // Date in YYYY-MM-DD format
        order_time: orderTime, // Time in HH:MM:SS format
      };

      // Send the order data to the backend
      const response = await fetch("http://localhost:5000/user/order/confirm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error("Failed to confirm the order");
      }

      // Clear the cart after confirming the order
      setCartItems([]);
      localStorage.removeItem("cartItems");
      alert("Order confirmed!");
    } catch (error) {
      console.error("Error confirming order:", error);
      alert("Failed to confirm the order. Please try again.");
    }
  };

  // Calculate total price based on item quantity
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.PRICE * item.quantity,
    0
  );

  return (
    <div className="cart">
      {cartItems.length === 0 ? (
        <p style={{ fontSize: "30px", color: "white",textAlign: "center" }}>Your cart is empty.</p>
      ) : (
        <div className="cart-all-section">
          <div className="cart-section-left">
            <h2 className="cart-section-right-title">
              MY CART ( {cartItems.length} )
            </h2>
            <div className="cart-items">
            {cartItems.map((item) => (
              <CartCard
                key={item.PRO_ID} // Ensure the key is the unique product ID
                item={item}
                onCancel={handleCancelItem}
              />
            ))}

            </div>
          </div>
          <div className="cart-section-right">
            <h2 className="cart-section-right-title">Order Summary</h2>
            <p className="cart-section-right-subtotal">
              Order Subtotal <span>${totalPrice.toFixed(2)}</span>
            </p>
            <p className="cart-section-right-subtotal">
              Estimated Shipping{" "}
              <p style={{ marginLeft: "20px", color: "green" }}>FREE</p>
            </p>
            <p className="cart-section-right-subtotal">
              Estimated Tax <span>$0.00</span>
            </p>
            <p className="cart-section-right-total">
              Total <span>${totalPrice.toFixed(2)}</span>
            </p>
            <p className="cart-section-right-tax-msg">
              Shipping & taxes are calculated at checkout
            </p>
            <button
              className="cart-section-right-order-button"
              onClick={handleConfirmOrder}
            >
              Confirm Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
