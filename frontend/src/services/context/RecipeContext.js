import React, { createContext, useReducer, useContext } from 'react';
import { recipeReducer } from '../reducers/RecipeReducer';


const RecipeStateContext = createContext();
const RecipeDispatchContext = createContext();

const initialState = {
  recipes: [],
};

export const RecipeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(recipeReducer, initialState);

  return (
    <RecipeStateContext.Provider value={state}>
      <RecipeDispatchContext.Provider value={dispatch}>
        {children}
      </RecipeDispatchContext.Provider>
    </RecipeStateContext.Provider>
  );
};

export const useRecipeState = () => {
  const context = useContext(RecipeStateContext);
  if (context === undefined) {
    throw new Error('useRecipeState must be used within a RecipeProvider');
  }
  return context;
};

export const useRecipeDispatch = () => {
  const context = useContext(RecipeDispatchContext);
  if (context === undefined) {
    throw new Error('useRecipeDispatch must be used within a RecipeProvider');
  }
  return context;
};

