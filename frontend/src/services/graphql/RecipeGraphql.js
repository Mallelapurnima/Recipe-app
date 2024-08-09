import { gql } from "@apollo/client";

export const GET_RECIPE = gql`
 query GetRecipe($id: ID!) {
  getRecipe(id: $id) {
    id
    title
    category
    ingredients
    instructions
    imageURL
  }
}
  
`;

export const GET_RECIPES = gql`
 query GetRecipes {
  getRecipes {
    id
    title
    category
    ingredients
    instructions
    imageURL
  }
}

`;

export const GET_RECIPES_COUNT = gql`
  query GetRecipesCount {
    getRecipesCount
  }
`;

export const DELETE_RECIPE = gql`
  mutation DeleteRecipe($id: ID!) {
    deleteRecipe(id: $id)
    
}

`;
export const ADD_RECIPE = gql`
  mutation AddRecipe($title: String!, $category: String!, $ingredients: [String!]!, $instructions: String!, $imageURL: String) {
  addRecipe(title: $title, category: $category, ingredients: $ingredients, instructions: $instructions, imageURL: $imageURL) {
    id
    title
    category
    ingredients
    instructions
    imageURL
  }
}

`;

export const EDIT_RECIPE = gql`
  mutation EditRecipe(
    $id: ID!,
    $title: String,
    $category: String,
    $ingredients: [String],
    $instructions: String,
    $imageURL: String
  ) {
    editRecipe(
      id: $id,
      title: $title,
      category: $category,
      ingredients: $ingredients,
      instructions: $instructions,
      imageURL: $imageURL
    ) {
      id
      title
      category
      ingredients
      instructions
      date
      imageURL
    }
  }
`;
