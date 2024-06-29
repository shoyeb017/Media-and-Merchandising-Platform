import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './Merch.css';
import ProductSection from './ProductSection';
import Cart from './Cart';
import ProductDetails from './ProductDetails';

const Merch = ({ products }) => {

//   const [cartItems, setCartItems] = useState([]);

//   const [products] = useState
// ([
//     {
//       id: 1,
//       name: 'Product 1',
//       price: 29.99,
//       img: '/img/3.jpg',
//       description: 'This is the description for Product 1.',
//       reviews: [
//         { name: 'Alice', description: 'Great product!', rating: 5 },
//         { name: 'Bob', description: 'Not bad', rating: 3 }
//       ]
//     },
//     {
//       id: 2,
//       name: 'Product 2',
//       price: 49.99,
//       img: '/img/4.jpg',
//       description: 'This is the description for Product 2.',
//       reviews: [
//         { name: 'Charlie', description: 'Loved it!', rating: 4 }
//       ]
//     },
//     {
//       id: 3,
//       name: 'Product 3',
//       price: 19.99,
//       img: '/img/5.jpg',
//       description: 'This is the description for Product 3.',
//       reviews: []
//     },
// ]);

//   const handleAddToCart = (product) => {
//     setCartItems([...cartItems, product]);
//   };

//   const handleConfirmOrder = () => {
//     alert('Order confirmed!');
//     setCartItems([]);
//   };

return (

    <div className="merch">

        {/* <Link to="/merch/cart" className="cart-button">Cart</Link> */}

        {/* <dev className="merch-list"> */}
        <ProductSection products={products} />
        {/* </dev> */}
    </div>
);
};

export default Merch;
