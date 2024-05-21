/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token); // Store token in local storage
        navigate("/dashboard");
      } else if (response.status === 404 || response.status === 401) {
        setError("Invalid email or password");
      } else {
        setError("Failed to log in. Please try again.");
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          {error && <p className="error text-red-500">{error}</p>}
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
