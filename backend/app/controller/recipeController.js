const Recipe = require('../model/recipe'); 


// Create a new recipe
const createRecipe = async (req, res) => {
  try {
    const { title, category, ingredients, instructions, imageURL, userId } = req.body;
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }
    const newRecipe = new Recipe({
      title,
      category,
      ingredients,
      instructions,
      imageURL,
      userId
    });

    const savedRecipe = await newRecipe.save();
     res.status(201).json(savedRecipe);  
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// Get all recipes
const getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find()
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get a single recipe by ID
const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a recipe by ID
const updateRecipe = async (req, res) => {
  try {
    const { title, category, ingredients, instructions, imageURL } = req.body;
    const recipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      { title, category, ingredients, instructions, imageURL },
      { new: true, runValidators: true }
    );
    if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
    res.status(200).json(recipe);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a recipe by ID
const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndDelete(req.params.id);
    if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
    res.status(200).json({ message: 'Recipe deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createRecipe,
  getRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe
};
