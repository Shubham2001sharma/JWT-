/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaCartPlus } from "react-icons/fa";
import ImageSlider from "./ImageSlider";
import { ProductCard } from "./ProductCard";
// import logo from "../assets/logo.png"; // Import your logo file

function Dashboard() {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const [searchQuery, setSearchQuery] = useState("");
  const [matchingProducts, setMatchingProducts] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
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
          navigate("/");
        }
      })
      .catch((error) => {
        console.error("Verification error:", error);
        navigate("/");
      });
  }, [navigate]);

  const logout = () => {
    try {
      localStorage.clear();
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleProductButtonClick = () => {
    navigate("/product");
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

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* header section start */}
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            {/* <img src={logo} alt="Logo" className="w-10 h-10 mr-2" /> */}
            <h1 className="text-2xl font-bold">ECOMMERCE</h1>
          </div>
          <div className="flex justify-center mb-5">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchInputChange}
              className="bg-gray-800 text-white font-bold py-2 px-4 rounded-l-md-white focus:outline-none"
              placeholder="Search Products..."
            />
            <button
              onClick={handleSearchSubmit}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-r-md focus:outline-none"
            >
              Search
            </button>
          </div>
          {matchingProducts.length > 0 && (
            <div className="flex flex-wrap justify-center">
              {matchingProducts.map((product) => (
                <img
                  key={product.id}
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-20 h-20 mx-2 my-2"
                />
              ))}
            </div>
          )}
          <div className="flex items-center">
            <FaCartPlus className="text-2xl mr-6 cursor-pointer" />
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
      {/* header section end */}

      {/* hero section start */}
      <div className="bg-gradient-to-b from-purple-800 to-indigo-800">
        <div className="container mx-auto py-6">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold">Discover Our Latest Products</h2>
            <p className="text-lg text-gray-200 mt-2">
              Explore our wide range of offerings
            </p>
          </div>
          <div className="text-center mb-5">
            <button
              onClick={handleProductButtonClick}
              className="bg-green-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
            >
              View Product
            </button>
          </div>
          <ImageSlider />
        </div>
      </div>
      {/* hero section ends */}

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
      {/* end footer section */}
    </div>
  );
}

export default Dashboard;
