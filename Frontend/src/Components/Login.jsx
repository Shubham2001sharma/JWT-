/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/login", {
        email,
        password,
      }, { withCredentials: true }); 
      console.log(response.data.message); // Log the response message for debugging
      if (response.data.message === "Login successful") {
        localStorage.setItem('token', response.data.token); // Store the token in local storage
        navigate("/dashboard");
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      setError("Failed to log in. Please try again.");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="bg-zinc-600 min-h-screen flex items-center justify-center">
      <div className="bg-zinc-900 p-8 rounded-lg">
        <h3 className="text-white text-2xl mb-4">LOGIN FORM</h3>
        <form onSubmit={handleSubmit}>
          <input
            className="mb-2 bg-gray-200 px-4 py-2 rounded-md w-96"
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <input
            className="mb-2 bg-gray-200 px-4 py-2 rounded-md w-96"
            type="password"
            placeholder="Password"
            maxLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          {error && <p className="error">{error}</p>}
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
            type="submit"
          >
            Submit
          </button>
          <Link className="text-purple-800 text-sm ml-52" to="/signup">
            Go To Signup
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
