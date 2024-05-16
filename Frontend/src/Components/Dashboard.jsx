/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const navigate = useNavigate();
axios.defaults.withCredentials=true;
  useEffect(() => {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage
    if (!token) {
      // If token does not exist, redirect to login
      navigate('/');
      return;
    }

    axios.get('http://localhost:3000/verify', {
      headers: {
        Authorization: `Bearer ${token}` // Include token in Authorization header
      }
    })
      .then(res => {
        if (!res.data.status) {
          navigate('/');
        }
      })
      .catch(error => {
        console.error('Verification error:', error);
        navigate('/'); // Handle error by redirecting to login
      });
  }, [navigate]); // Added navigate to dependency array to fix ESLint warning

  const logout = () => {
    try {
      localStorage.clear();
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Dashboard;
