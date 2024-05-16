import React from 'react'
import { createRoot } from "react-dom/client"; // Import createRoot from react-dom/client

import App from './App.jsx'
import './index.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Use createRoot to render your App component
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <ToastContainer/>
  </React.StrictMode>,
)
