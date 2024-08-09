const jwt = require("jsonwebtoken");
const SECRET_KEY = "your_secret_key";
const bcrypt = require("bcrypt");
const User = require("../app/model/user");
const Recipe = require("../app/model/recipe");

let recipes = [];

const resolvers = {
  Query: {
    getUsers: () => users,
    getRecipes: () => recipes,
    getRecipe: (_, { id }) => recipes.find((recipe) => recipe.id === id),
    getRecipesCount: () => recipes.length,
  },

  Mutation: {
    login: async (_, { username, password }) => {
      const user = await User.findOne({ username });
      if (!user) throw new Error("Invalid credentials");

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) throw new Error("Invalid credentials");

      const token = jwt.sign({ userId: user._id }, SECRET_KEY, {
        expiresIn: "1h",
      });
      return { token };
    },
    register: async (_, { username, password, email }) => {
      const existingUser = await User.findOne({
        $or: [{ username }, { email }],
      });
      if (existingUser) throw new Error("User already exists");
      const newUser = new User({ username, password, email });
      await newUser.save();
      return newUser;
    },
    addRecipe: (
      _,
      { title, category, ingredients, instructions, imageURL },
      { user }
    ) => {
      if (!user) throw new Error("Authentication required");
      const newRecipe = {
        id: String(recipes.length + 1),
        title,
        category,
        ingredients,
        instructions,
        date: new Date().toISOString(),
        imageURL,
      };
      recipes.push(newRecipe);
      return newRecipe;
    },
    editRecipe: (
      _,
      { id, title, category, ingredients, instructions, imageURL },
      { user }
    ) => {
      if (!user) throw new Error("Authentication required");
      const index = recipes.findIndex((recipe) => recipe.id === id);
      if (index === -1) return null;
      const updatedRecipe = {
        id,
        title,
        category,
        ingredients,
        instructions,
        date: recipes[index].date,
        imageURL,
      };
      recipes[index] = updatedRecipe;
      return updatedRecipe;
    },
    deleteRecipe: (_, { id }, { user }) => {
      if (!user) throw new Error("Authentication required");
      const index = recipes.findIndex((recipe) => recipe.id === id);
      if (index === -1) return false;
      recipes.splice(index, 1);
      return true;
    },
  },
};

module.exports = { resolvers };
