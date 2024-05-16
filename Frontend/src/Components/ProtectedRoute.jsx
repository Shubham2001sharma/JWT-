/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Element, ...rest }) => {
  const isAuthenticated = !!localStorage.getItem("token");
  
  return isAuthenticated ? (
    <Route {...rest} element={<Element />} />
  ) : (
    <Navigate to="/" replace />
  );
};
  
  


export default ProtectedRoute;
