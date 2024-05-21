/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import CartContext from './CartContext';

// eslint-disable-next-line react/prop-types
function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    // Load cart from local storage when the component mounts
    const savedCartItems = localStorage.getItem('cartItems');
    return savedCartItems ? JSON.parse(savedCartItems) : [];
  });

  useEffect(() => {
    // Save cart to local storage whenever it changes
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item) => {
    setCartItems((prevItems) => [...prevItems, item]);
  };

  const removeFromCart = (itemId) => {
    setCartItems((prevItems) => prevItems.filter(item => item.id !== itemId));
  };

  const updateCartItem = (itemId, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateCartItem }}>
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
