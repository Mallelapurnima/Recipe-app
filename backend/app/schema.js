const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
  }
    
 type Recipe {
  id: ID!
  title: String!
  category: String!
  ingredients: [String]
  instructions: String!
  imageURL: String
  date: String
}

  type AuthPayload {
    token: String!
  }

  type Query {
    getUsers: [User!]!
    getRecipe(id: ID!): Recipe
    getRecipes: [Recipe]
    getRecipesCount: Int!
  }

  type Mutation {
    login(username: String!, password: String!): AuthPayload!
    register(username: String!, password: String!, email: String!): User!
    addRecipe(title: String!, category: String!, ingredients: [String!]!, instructions: String!, imageURL: String ): Recipe
    editRecipe(id: ID!, title: String, category: String, ingredients: [String], instructions: String, imageURL: String): Recipe
    deleteRecipe(id: ID!): String
  }
`;

module.exports = { typeDefs };
