import React from 'react';
import './Cart.css';

const CartCard = ({ item, onCancel }) => {
  return (
    <div className="cart-card">
      <img src={item.img} alt={item.name} className="cart-card-image" />
      <div className="cart-card-details">
        <h4>{item.name}</h4>
        <p>${item.price}</p>
        <button onClick={() => onCancel(item.id)}>Cancel</button>
      </div>
    </div>
  );
};

const Cart = ({ cartItems, onConfirmOrder, onCancelItem }) => {
  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  return (
    <div className="cart">
      <h2>Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <CartCard key={item.id} item={item} onCancel={onCancelItem} />
            ))}
          </div>
          <h3>Total: ${totalPrice.toFixed(2)}</h3>
          <button onClick={onConfirmOrder}>Confirm Order</button>
        </>
      )}
    </div>
  );
};

export default Cart;
