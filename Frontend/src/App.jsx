/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route,  } from "react-router-dom";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Dashboard from "./Components/Dashboard";

function App() {
  

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />

      </Routes>
    </Router>
  );
}

export default App;
