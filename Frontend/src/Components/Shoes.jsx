/* eslint-disable no-unused-vars */
import React, { useState, useContext } from "react";
import Header from "./Header";
import { ShoesData } from './ShoesData';
import Cartcontext from "../CONTEXT/CartContext";
import Footer from "./Footer";

function Shoes() {
    const [quantity, setQuantity] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [matchingProducts, setMatchingProducts] = useState([]);
    const { addToCart, cartItems } = useContext(Cartcontext);

    const productsToDisplay = searchQuery ? matchingProducts : ShoesData;

    return (
        <div className="bg-gradient-to-b from-purple-300 to-indigo-700 min-h-screen">
            {/* Header section */}
            <Header />
            {/* End of header section */}

            <h1 className="text-8xl font-bold text-center text-gray-900 mb-8">
                SHOES
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
                                        {product.description.length > 20
                                            ? product.description.slice(0, 20) + "..."
                                            : product.description}
                                    </p>

                                    <p className="product-category text-red-700 font-bold">
                                        {product.category}
                                    </p>
                                    <button
                                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none mt-4"
                                        onClick={() => addToCart(product)}
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-red-500 font-bold">
                            No matching products found.
                        </p>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Shoes;
