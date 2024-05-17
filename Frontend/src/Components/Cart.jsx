/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import CartContext from '../CONTEXT/CartContext';

function Cart() {
  const { cartItems, removeFromCart, updateCartItem } = useContext(CartContext);

  // Calculate total price
  const totalPrice = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <div className="p-6 bg-gray-100 rounded-lg w-full flex ">
      <div className="w-1/2 pr-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Your Cart</h1>
        {cartItems.map((item) => (
          <div key={item.id} className="flex items-center mb-6 bg-green-300 rounded-lg p-4 shadow-md ">
            <img src={item.image} alt={item.name} className="w-40 h-auto mr-6 rounded-md" />
            <div className="flex-1">
             
              <p className="text-gray-700 mb-2">Price: ${item.price * item.quantity}</p>
              <p className="text-gray-700 text-xl mb-2 font-semibold">Title: {item.title}</p>
              <p className="text-gray-700 mb-2">Description: {item.description}</p>
              <div className="flex items-center">
                <button onClick={() => updateCartItem(item.id, item.quantity + 1)} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2">+</button>
                <p className="text-gray-900 font-semibold">{item.quantity}</p>
                <button onClick={() => updateCartItem(item.id, item.quantity - 1)} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ml-2 mr-2">-</button>
                <button onClick={() => removeFromCart(item.id)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">Remove</button>
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
        <p className="text-xl font-semibold">Total: ${totalPrice}</p>
        <button className='bg-green-700 text-black  font-semibold text-xl h-10 w-44 mt-6 rounded-md'>ORDER NOW</button>
      </div>
      
    </div>
  );
}

export default Cart;
