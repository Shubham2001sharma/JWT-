/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route,  } from "react-router-dom";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Dashboard from "./Components/Dashboard";
import Product from "./Components/Product";
import Cart from "./Components/Cart";
import CartProvider from "./CONTEXT/CartProvider";

function App() {
  

  return (
    <CartProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/product" element={<Product/>}/>
        <Route path="/cart" element={<Cart/>}/>

      </Routes>
    </Router>
    </CartProvider>
  );
}

export default App;
