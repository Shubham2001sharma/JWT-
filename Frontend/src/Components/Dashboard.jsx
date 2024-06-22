/* eslint-disable no-unused-vars */

import React, { useState } from "react";
import Header from "./Header";
import { Tshirtdata } from "./Tshirtdata";
import { useNavigate } from "react-router-dom";
import ImageSlider from "./ImageSlider";
import Footer from "./Footer";

function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [matchingProducts, setMatchingProducts] = useState([]);
  const navigate = useNavigate();

  const handleProductButtonClick = () => {
    navigate("/product");
  };
  const handleTshirtButtonClick = () => {
    navigate("/tshirt");
  };
  const handleShoesButtonClick=()=>{
    navigate("/shoe")
  }

  const productsToDisplay = searchQuery ? matchingProducts : Tshirtdata;

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Header />

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
          <div className="text-center mb-5 space-x-5">
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
            <button
              onClick={handleShoesButtonClick}
              className="bg-gradient-to-b from-purple-700 to-indigo-700 hover:bg-blue-600 text-black font-bold py-2 px-4 rounded transition duration-300"
            >
              SHOES
            </button>
          </div>
          <ImageSlider />
        </div>
      </div>
      {/* hero section ends */}

      
      <Footer />
    </div>
  );
}

export default Dashboard;
