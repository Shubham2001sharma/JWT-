/* eslint-disable no-unused-vars */
// Dashboard.jsx
import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { FaCartPlus } from "react-icons/fa";
import ImageSlider from "./ImageSlider";

import Cartcontext from "../CONTEXT/CartContext";
import { Tshirtdata } from "./Tshirtdata";
import { FaTshirt } from "react-icons/fa";
import { FaBagShopping } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import logo from "../assets/logo1.png";

function Dashboard() {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const [searchQuery, setSearchQuery] = useState("");
  const [matchingProducts, setMatchingProducts] = useState([]);
  const { cartItems } = useContext(Cartcontext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("No token found, redirecting to login.");
      navigate("/");
      return;
    }

    axios
      .get("http://localhost:3000/verify", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (!res.data.status) {
          console.warn("Token verification failed, redirecting to login.");
          navigate("/");
        }
      })
      .catch((error) => {
        console.error("Verification error:", error);
        navigate("/");
      });
  }, [navigate]);

  const logout = () => {
    axios
      .get("http://localhost:3000/logout")
      .then((response) => {
        if (response.status === 200) {
          localStorage.removeItem("token"); // Remove token from localStorage
          navigate("/"); // Redirect to the login page
        } else {
          console.error("Logout failed with status:", response.status);
        }
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };

  const handleProductButtonClick = () => {
    navigate("/product");
  };
  const handleTshirtButtonClick = () => {
    navigate("/tshirt");
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
    <div className="bg-gray-900 text-white min-h-screen">
      {/* header section start */}
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
      {/* header section end */}

      {/* hero section start */}
      <div className="bg-gradient-to-b from-purple-300 to-indigo-700">
        <div className="container py-6 mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-900">
              Discover Our Latest Products
            </h2>
            <p className="text-lg text-gray-900 mt-2">
              Explore our wide range of offerings
            </p>
          </div>
          <div className="text-center mb-5">
            <button
              onClick={handleProductButtonClick}
              className="bg-gradient-to-b from-purple-700 to-indigo-700 hover:bg-blue-600 text-black font-bold py-2 px-4 rounded transition duration-300"
            >
              BAGS
            </button>
            <button
              onClick={handleTshirtButtonClick}
              className="bg-gradient-to-b from-purple-700 to-indigo-700 text-black font-bold py-2 px-4 rounded transition duration-300 ml-2 md:ml-10 mt-2 md:mt-0"
            >
              TSHIRTS
            </button>
          </div>
          <ImageSlider />
        </div>
      </div>
      {/* hero section ends */}

      {/* Footer Section */}
      <footer className="bg-gradient-to-b from-purple-200 to-indigo-500 text-gray-900 py-8">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
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
      {/* end footer section */}
    </div>
  );
}

export default Dashboard;
