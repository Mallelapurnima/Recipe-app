import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import RecipeList from '../components/RecipeList/RecipeList';
import RecipeForm from '../components/RecipeForm/RecipeForm';
import RecipeDetails from '../components/RecipeDetails/RecipeDetails';
import Login from '../components/Login/Login';
import Register from '../components/Register/Register';
import Dashboard from '../components/Dashboard/Dashboard';
import ProtectedRoute from './ProtectedRoutes';

const RoutesComponent = () => {
    
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      <Route 
        path="/recipes/:id" 
        element={<ProtectedRoute element={<RecipeDetails />} />} 
      />
      <Route 
        path="/add-recipe" 
        element={<ProtectedRoute element={<RecipeForm />} />} 
      />
      <Route 
        path="/edit-recipe/:id" 
        element={<ProtectedRoute element={<RecipeForm />} />} 
      />
      <Route path="/recipes" element={<Dashboard />} />
      <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default RoutesComponent;

