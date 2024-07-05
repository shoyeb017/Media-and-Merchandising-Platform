import React from 'react';
import './Cart.css';

const CartCard = ({ item, onCancel }) => {
  return (
    <div className="cart-card">
      <img src={item.IMAGE} alt={item.NAME} className="cart-card-image" />
      <div className="cart-card-details">
        <h4>{item.NAME}</h4>
        <p>${item.PRICE}</p>
        <button onClick={() => onCancel(item.id)}>Cancel</button>
      </div>
    </div>
  );
};

const Cart = ({ cartItems, onConfirmOrder, onCancelItem }) => {
  const totalPrice = cartItems.reduce((total, item) => total + item.PRICE, 0);

  return (
    <div className="cart">
      <h2>Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <CartCard key={item.PRO_ID} item={item} onCancel={onCancelItem} />
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
