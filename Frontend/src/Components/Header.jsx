/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { FaCartPlus, FaTshirt, FaHome } from "react-icons/fa"; 
import { FaBagShopping } from "react-icons/fa6";
import { GiRunningShoe } from "react-icons/gi";

import Cartcontext from "../CONTEXT/CartContext";
import { Tshirtdata } from "./Tshirtdata";
import logo from "../assets/logo1.png";
import { ShoesData } from "./ShoesData";
import { ProductCard } from "./ProductCard";

function Header() {
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

        axios.get("https://backend-five-beige.vercel.app/verify", {
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
        axios.get("https://backend-five-beige.vercel.app/logout")
            .then((response) => {
                if (response.status === 200) {
                    localStorage.removeItem("token"); 
                    navigate("/"); 
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
      const allProducts = [...Tshirtdata, ...ShoesData, ...ProductCard];
      const filteredProducts = allProducts.filter((product) =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setMatchingProducts(filteredProducts);
  };
  
    return (
        <nav className="bg-gradient-to-b from-purple-200 to-indigo-400 p-4 fixed top-0 w-full z-50">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                <div className="flex items-center mb-4 md:mb-0">
                    <img src={logo} className="h-24 w-24 rounded-full mr-2" alt="Logo" />
                    <h1 className="text-2xl font-bold text-gray-900">AJEEB</h1>
                    <div className="flex ml-4 space-x-4">
                        <Link to="/dashboard" className="relative">
                            <FaHome className="text-3xl text-black" />
                        </Link>
                        <Link to="/product" className="relative">
                            <FaBagShopping  className="text-3xl text-black" />
                        </Link>
                        <Link to="/tshirt" className="relative">
                            <FaTshirt className="text-3xl text-black" />
                        </Link>
                        <Link to="/shoe" className="relative">
                            <GiRunningShoe className="text-3xl text-black" />
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
                            <span className="text-black text-md from-stone-50 pl-3">
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
    );
}

export default Header;
