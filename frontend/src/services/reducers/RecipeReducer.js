import { SET_RECIPES, ADD_RECIPE, EDIT_RECIPE, DELETE_RECIPE } from '../actions/RecipeActionTypes';

const initialState = {
  recipes: [],
};

export const recipeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_RECIPES:
      return { ...state, recipes: action.payload };
    case ADD_RECIPE:
      return { ...state, recipes: [...state.recipes, action.payload] };
    case EDIT_RECIPE:
      return {
        ...state,
        recipes: state.recipes.map(recipe =>
          recipe.id === action.payload.id ? action.payload : recipe
        ),
      };
    case DELETE_RECIPE:
      return {
        ...state,
        recipes: state.recipes.filter(recipe => recipe.id !== action.payload),
      };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};
