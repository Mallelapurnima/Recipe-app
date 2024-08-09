import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { RecipeProvider } from './services/context/RecipeContext';
import { AuthProvider } from './services/context/AuthContext';
import RoutesComponent from './routes/routes';

const AppWrapper = () => {
  return (
    <RoutesComponent />
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <RecipeProvider>
          <AppWrapper />
        </RecipeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
