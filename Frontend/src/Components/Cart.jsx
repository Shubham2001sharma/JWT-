/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import CartContext from '../CONTEXT/CartContext';
import { loadStripe } from "@stripe/stripe-js";

function Cart() {
  const { cartItems, removeFromCart, updateCartItem } = useContext(CartContext);

  // Calculate total price
  const totalPrice = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const orderNow = async () => {
    try {
      console.log("Sending cart items to backend:", cartItems);
      
      const response = await fetch("http://localhost:3000/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cartItems }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch");
      }

      const data = await response.json();
      console.log("Payment intent created:", data);

      const stripe = await loadStripe("pk_test_51P7A0CSGLIDhZb7JC1cU89xWxqRt0XTzHu4E2LUhlrZAA4D2VjPktWKBxeXLnl0owXbPZA510w7GuIeAvIkIp8vs00oLABJybU");
      stripe.redirectToCheckout({ sessionId: data.sessionId });
    } catch (error) {
      console.error("Error creating payment intent:", error.message);
    }
  }

  return (
    <div className="p-6 bg-gray-100 rounded-lg w-full flex ">
      <div className="w-1/2 pr-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Your Cart</h1>
        {cartItems.map((item) => (
          <div key={item.id} className="flex items-center mb-6 bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition duration-300 ease-in-out">
            <img src={item.image} alt={item.name} className="w-32 h-auto mr-6 rounded-md" />
            <div className="flex-1">
              <p className="text-gray-700 mb-2">Price: ${item.price * item.quantity}</p>
              <p className="text-gray-700 text-xl mb-2 font-semibold">{item.title}</p>
              <p className="text-gray-700 mb-2">{item.description}</p>
              <div className="flex items-center">
                <button onClick={() => updateCartItem(item.id, item.quantity + 1)} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded mr-2">+</button>
                <p className="text-gray-900 font-semibold">{item.quantity}</p>
                <button onClick={() => updateCartItem(item.id, item.quantity - 1)} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded ml-2 mr-2">-</button>
                <button onClick={() => removeFromCart(item.id)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded">Remove</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="w-1/2 bg-yellow-300 rounded-lg p-6"> {/* Order Summary Section */}
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Order Summary</h2>
        {cartItems.map((item) => (
          <div key={item.id} className="mb-2">
            <p className="text-gray-900">{item.name}</p>
            <p className="text-gray-700">Price: ${item.price * item.quantity}</p>
            <p className="text-gray-700">Title: {item.title}</p>
          </div>
        ))}
        <hr className="my-4" />
        <p className="text-xl font-semibold text-gray-900">Total: ${totalPrice}</p>
        <button className='bg-green-700 hover:bg-green-600 text-white font-semibold text-xl h-10 w-full mt-6 rounded-md transition duration-300 ease-in-out' onClick={orderNow}>ORDER NOW</button>
      </div>
    </div>
  );
}

export default Cart;
