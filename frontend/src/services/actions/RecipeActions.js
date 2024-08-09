import { SET_RECIPES, ADD_RECIPE, EDIT_RECIPE, DELETE_RECIPE } from './RecipeActionTypes';

export const setRecipes = (recipes) => ({
  type: SET_RECIPES,
  payload: recipes,
});

export const addRecipe = (recipe) => ({
  type: ADD_RECIPE,
  payload: recipe,
});

export const editRecipe = (recipe) => ({
  type: EDIT_RECIPE,
  payload: recipe,
});

export const deleteRecipe = (id) => ({
  type: DELETE_RECIPE,
  payload: id,
});
