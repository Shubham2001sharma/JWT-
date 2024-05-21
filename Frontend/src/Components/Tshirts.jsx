/* eslint-disable no-unused-vars */
import React, { useState, useContext } from "react";
import { Tshirtdata } from "./Tshirtdata";
import { Navigate, Link } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";
import Cartcontext from "../CONTEXT/CartContext";
import axios from "axios";
import { FaTshirt } from "react-icons/fa";
import { FaBagShopping } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import logo from "../assets/logo1.png";

function Tshirts() {
  const [quantity, setQuantity] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [matchingProducts, setMatchingProducts] = useState([]);

  const { addToCart, cartItems } = useContext(Cartcontext);

  const navigate = Navigate;
  axios.defaults.withCredentials = true;

  const logout = () => {
    axios
      .get("http://localhost:3000/logout")
      .then((response) => {
        if (response.status === 200) {
          localStorage.removeItem("token"); // Remove token from localStorage
          window.location.href = "/"; // Redirect to the login page
        } else {
          console.error("Logout failed with status:", response.status);
        }
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = () => {
    const filteredProducts = Tshirtdata.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setMatchingProducts(filteredProducts);
  };

  const productsToDisplay = searchQuery ? matchingProducts : Tshirtdata;
  return (
    <div className="bg-gradient-to-b from-purple-300 to-indigo-700 min-h-screen ">
      {/* Header section */}
      <nav className="bg-gradient-to-b from-purple-200 to-indigo-400 p-4">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <img src={logo} className="h-24 w-24 rounded-full mr-2" alt="Logo"></img>
            <h1 className="text-2xl font-bold text-gray-900">AJEEB</h1>
            <div className="flex ml-4">
              <Link to="/product" className="relative mr-4">
                <FaBagShopping className="text-3xl text-black" />
              </Link>
              <Link to="/tshirt" className="relative mr-4">
                <FaTshirt className="text-3xl text-black" />
              </Link>
              <Link to="/dashboard" className="relative">
                <FaHome className="text-3xl text-black" />
              </Link>
            </div>
          </div>
          <div className="flex justify-center mb-4 md:mb-0">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchInputChange}
              className="bg-gray-800 text-white font-bold py-2 px-4 rounded-l-md focus:outline-none"
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
                <span className=" text-black text-md from-stone-50 pl-3">
                  {cartItems.length}
                </span>
              )}
              <FaCartPlus className="text-3xl text-black" />
            </Link>
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 ml-5 rounded"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
      {/* End of header section */}

      <h1 className="text-8xl font-bold text-center text-gray-900 mb-8">
        TSHIRTS
      </h1>

      {/* Start hero section */}
      <div className="container mx-auto mt-5 mb-10 bg-gradient-to-b from-green-300 to-yellow-500">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {productsToDisplay.length > 0 ? (
            productsToDisplay.map((product) => (
              <div
                key={product.id}
                className="bg-gradient-to-b from-green-100 to-yellow-200 pr-2 rounded-lg shadow-md flex"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="product-image mt-2 ml-2 mb-2 rounded-lg"
                  style={{
                    backgroundColor: "#e0e0e0",
                    objectFit: "cover",
                    width: "220px",
                    height: "250px",
                  }}
                />
                <div className="flex flex-col p-4 ml-10 mt-8">
                <h2 className="product-name text-xl font-semibold text-green-700" title={product.title}>
  {product.title.length > 10
    ? product.title.slice(0, 10) + "..."
    : product.title}
</h2>
                  <p className="product-price text-lg font-semibold text-gray-800">
                    ${product.price * quantity}
                  </p>
                  <p className="product-description text-yellow-900 font-bold">
                    {product.description.length > 15
                      ? product.description.slice(0, 15) + "..."
                      : product.description}
                  </p>

                  <p className="product-category text-red-700 font-bold">
                    {product.category}
                  </p>
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4"
                    onClick={() => addToCart({ ...product, quantity: 1 })}
                  >
                    ADD TO CART
                  </button>
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
      <footer className="bg-gradient-to-b from-purple-200 to-indigo-500 text-gray-900 py-8">
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

export default Tshirts;
