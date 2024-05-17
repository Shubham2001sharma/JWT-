/* eslint-disable no-unused-vars */
import React, { useState, useContext  } from "react";
import { ProductCard } from "./ProductCard"; 
import { Navigate, Link } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";
import Cartcontext from "../CONTEXT/CartContext";

function Product() {
  const [quantity, setQuantity] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [matchingProducts, setMatchingProducts] = useState([]);
  

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    setQuantity(newQuantity);
  };

  const { addToCart,cartItems } = useContext(Cartcontext);
  

  const navigateTo = Navigate;

  const logout = () => {
    try {
      localStorage.clear();
      navigateTo("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = () => {
    const filteredProducts = ProductCard.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setMatchingProducts(filteredProducts);
  };

  const productsToDisplay = searchQuery ? matchingProducts : ProductCard;

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Header section */}
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold">ECOMMERCE</h1>
          </div>
          <div className="flex justify-center mb-5">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchInputChange}
              className="bg-gray-700 text-white font-bold py-2 px-4 rounded-l-md focus:outline-none"
              placeholder="Search Products..."
            />
            <button
              onClick={handleSearchSubmit}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-r-md focus:outline-none"
            >
              Search
            </button>
          </div>
          <div className="flex items-center">
          <Link to="/cart" className="relative">
          {cartItems.length > 0 && (
            <span className=" text-white text-md ml-4 text-md from-stone-50">
              {cartItems.length}
            </span>
          )}
          <FaCartPlus className="text-3xl text-blue-500 " />
         
        </Link>
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 ml-4 rounded"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
      {/* End of header section */}

      {/* Start hero section */}
      <div className="container mx-auto mt-10 mb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {productsToDisplay.length > 0 ? (
            productsToDisplay.map((product) => (
              <div
                key={product.id}
                className="bg-gray-100 pr-2 rounded-lg shadow-md flex"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="product-image mt-2 ml-2 mb-2 "
                  style={{
                    backgroundColor: "#e0e0e0",
                    objectFit: "cover",
                    width: "150px",
                    height: "250px",
                    
                  }}
                />
                <div className="flex flex-col p-4 ml-10 mt-8">
                  <h2 className="product-name text-xl font-semibold text-green-700">
                    {product.title}
                  </h2>
                  <p className="product-price text-lg font-semibold text-gray-800">
                    ${product.price * quantity}
                  </p>
                  <p className="product-description text-yellow-600">
  {product.description.length > 20 ? product.description.slice(0, 20) + '...' : product.description}
</p>

                  <p className="product-category text-red-700">
                    {product.category}
                  </p>
                  <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4"
                     onClick={() => addToCart({ ...product, quantity: 1, })}>ADD TO CART
                  </button>
                  {/* <label htmlFor="quantity" className="block mt-4 text-gray-700">
                    Quantity:
                  </label>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    min="1"
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg focus:outline-none focus:bg-white mb-2"
                  /> */}
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-xl text-gray-400">
              No products found.
            </p>
          )}
        </div>
      </div>
      {/* end of hero section */}

      {/* Footer Section */}
      <footer className="bg-gray-800 text-gray-300 py-8">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <p>123 Street Name, City, Country</p>
            <p>Email: info@example.com</p>
            <p>Phone: +1234567890</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul>
              <li>About Us</li>
              <li>Terms of Service</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
        </div>
      </footer>
      {/* footer section End*/}
    </div>
  );
}

export default Product;
