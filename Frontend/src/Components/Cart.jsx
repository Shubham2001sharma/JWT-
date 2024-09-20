import React, { useContext } from "react";
import CartContext from "../CONTEXT/CartContext";

function Cart() {
  const { cartItems, removeFromCart, updateCartItem } = useContext(CartContext);

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + (Number(item.price) || 0) * (Number(item.quantity) || 0),
    0
  );

  const orderNow = async () => {
    try {
      console.log("Sending cart items to backend:", cartItems);

      const response = await fetch("https://backend-five-beige.vercel.app/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cartItems, totalPrice }),
      });
      
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorMessage}`);
      }
      
      const data = await response.json();
      console.log("Order data received:", data);

      const options = {
        key: 'rzp_test_mkAsXNhrplFsgo', // Replace with your Razorpay key id
        amount: data.amount, // Amount in paise (data.amount should be in paise)
        currency: "INR",
        name: "Your Company Name",
        description: "Order Description",
        image: "https://example.com/your-logo.png",
        order_id: data.orderId, // Order ID generated from your backend
        handler: function (response) {
          console.log("Payment successful:", response);
          // Handle successful payment response here
        },
        prefill: {
          name: "Customer Name",
          email: 'sharmashubu4600@gmail.com',
          contact: "9999999999",
        },
        notes: {
          address: "Customer address",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Error creating Razorpay order:", error.message);
    }
  };

  return (
    <>
      <div className="p-4 md:p-6 bg-gradient-to-b from-purple-200 to-indigo-400 rounded-lg w-full flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 pr-0 md:pr-6">
          <h1 className="text-3xl font-bold mb-4 md:mb-6 text-gray-800">
            Your Cart
          </h1>
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col md:flex-row items-center mb-4 md:mb-6 bg-gradient-to-b from-green-200 to-green-400 rounded-lg p-4 shadow-md hover:shadow-lg transition duration-300 ease-in-out"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-24 md:w-32 h-auto mr-0 md:mr-6 rounded-md mb-2 md:mb-0"
              />
              <div className="flex-1">
                <p className="text-gray-700 mb-1 font-bold">
                  Price: ${(Number(item.price) || 0) * (Number(item.quantity) || 0)}
                </p>
                <p className="text-gray-700 text-lg mb-1 font-semibold">
                  {item.title}
                </p>
                <p className="text-gray-700 mb-1">{item.description}</p>
                <div className="flex items-center">
                  <button
                    onClick={() => updateCartItem(item.id, item.quantity + 1)}
                    className="bg-blue-500 hover:bg-blue-900 text-white font-bold py-1 px-2 md:py-1 md:px-3 rounded mr-1 md:mr-2"
                  >
                    +
                  </button>
                  <p className="text-gray-900 font-semibold">{item.quantity}</p>
                  <button
                    onClick={() => updateCartItem(item.id, item.quantity - 1)}
                    className="bg-blue-500 hover:bg-blue-900 text-white font-bold py-1 px-2 md:py-1 md:px-3 rounded ml-1 md:ml-2 mr-1 md:mr-2"
                  >
                    -
                  </button>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 md:py-1 md:px-3 rounded"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="w-full md:w-1/2 bg-gradient-to-b from-yellow-200 to-yellow-500 rounded-lg p-4 md:p-6 mt-4 md:mt-0">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-gray-950">
            Order Summary
          </h2>
          {cartItems.map((item) => (
            <div key={item.id} className="mb-2 font-bold">
              <p className="text-gray-900 ">
                Price: ${(Number(item.price) || 0) * (Number(item.quantity) || 0)}
              </p>
              <p className="text-gray-900">Title: {item.title}</p>
            </div>
          ))}
          <hr className="my-4" />
          <p className="text-xl md:text-2xl text-gray-900 font-bold">
            Total: ${totalPrice}
          </p>
          <button
            className="bg-green-700 hover:bg-green-600 text-white font-semibold text-lg md:text-xl h-10 md:h-12 w-full mt-6 rounded-md transition duration-300 ease-in-out"
            onClick={orderNow}
          >
            ORDER NOW
          </button>
        </div>
      </div>
    </>
  );
}

export default Cart;
