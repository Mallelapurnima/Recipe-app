import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthState } from '../services/context/AuthContext';

const ProtectedRoute = ({ element }) => {
  const { isAuthenticated } = useAuthState();
  return isAuthenticated ? element : <Navigate to="/login" replace />;
};

export default ProtectedRoute;



