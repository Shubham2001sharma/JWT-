/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function Signup() {
  const navigateTo = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      // Make the HTTP request
      await axios.post("http://localhost:3000/FinalData", {
        name,
        email,
        password,
      });
      toast.success("Data submitted successfully!"), navigateTo("/");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const validateForm = () => {
    const validationErrors = {};
    if (!name.trim()) {
      validationErrors.name = "Name is required";
    }
    if (!email.trim()) {
      validationErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      validationErrors.email = "Invalid email address";
    } else if (email.toLowerCase() !== email) {
      validationErrors.email = "Email should be in lowercase";
    }
    if (!password.trim()) {
      validationErrors.password = "Password is required";
    } else if (password.length < 6 || password.length > 8) {
      validationErrors.password =
        "Password must be between 6 and 8 characters long";
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  return (
    <div>
      <div className="bg-zinc-600 min-h-screen flex items-center justify-center">
        <div className="bg-zinc-900 p-8 rounded-lg">
          <h3 className="text-white text-2xl mb-4">SIGNUP FORM</h3>
          <form onSubmit={handleSubmit}>
            <input
              className="mb-2 bg-gray-200 px-4 py-2 rounded-md w-96"
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <br />
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
              maxlength="8"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.name && <p className=" text-red-500 ">{errors.name}</p>}
            {errors.email && <p className="text-red-500 ">{errors.email}</p>}
            {errors.password && (
              <p className="text-red-500 ">{errors.password}</p>
            )}
            <br />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-1 rounded-md"
            >
              Submit
            </button>

            <Link className="text-purple-800 text-sm ml-52" to="/">
              Go To Login
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
