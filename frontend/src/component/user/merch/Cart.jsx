import React, { useState, useEffect } from 'react';
import { DateTime } from 'luxon';
import './Cart.css';

const CartCard = ({ item, onCancel }) => {
  return (
    <div className="cart-card">
      <img src={item.IMAGE} alt={item.NAME} className="cart-card-image" />
      <div className="cart-card-details">
        <h4>{item.NAME}</h4>
        <p>Price: ${item.PRICE.toFixed(2)}</p>
        <p>Quantity: {item.quantity}</p>
        <p>Total: ${(item.PRICE * item.quantity).toFixed(2)}</p>
        <button onClick={() => onCancel(item.PRO_ID)}>Cancel</button>
      </div>
    </div>
  );
};

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  // Load cart items from localStorage on component mount
  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedCartItems);
  }, []);

  // Function to handle canceling an item
  const handleCancelItem = (id) => {
    const updatedCartItems = cartItems.filter(item => item.PRO_ID !== id);
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };


  const handleConfirmOrder = async () => {
    try {
        // Get current date and time
        const now = new Date();
        
        // Format the date and time
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');

        const orderDate = `${day}-${month}-${year}`;
        const orderTime = `${hours}:${minutes}:${seconds}`;

        // Prepare the order data
        const orderData = {
            user_id: localStorage.getItem('user_id'),
            items: cartItems,
            order_date: orderDate, // Date in YYYY-MM-DD format
            order_time: orderTime, // Time in HH:MM:SS format
        };
  
      // Send the order data to the backend
      const response = await fetch('http://localhost:5000/user/order/confirm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to confirm the order');
      }
  
      // Clear the cart after confirming the order
      setCartItems([]);
      localStorage.removeItem('cartItems');
      alert('Order confirmed!');
  
    } catch (error) {
      console.error('Error confirming order:', error);
      alert('Failed to confirm the order. Please try again.');
    }
  };
  

  // Calculate total price based on item quantity
  const totalPrice = cartItems.reduce((total, item) => total + item.PRICE * item.quantity, 0);

  return (
    <div className="cart">
      <h2>Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <CartCard 
                key={item.PRO_ID} 
                item={item} 
                onCancel={handleCancelItem} 
              />
            ))}
          </div>
          <h3>Total: ${totalPrice.toFixed(2)}</h3>
          <button onClick={handleConfirmOrder}>Confirm Order</button>
        </>
      )}
    </div>
  );
};

export default Cart;
