

import React, { createContext, useReducer, useContext } from 'react';
import authReducer from '../reducers/AuthReducer';

// Create the AuthContext
const AuthContext = createContext();

// AuthProvider component that uses the authReducer to manage state
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { isAuthenticated: false, token: null });

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hooks to use context values
export const useAuthState = () => useContext(AuthContext).state;
export const useAuthDispatch = () => useContext(AuthContext).dispatch;

// Export AuthContext for use in other components if needed
export default AuthContext;

