const express = require("express");
const router = express.Router();

const {
  createRecipe,
  getRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
} = require("../controller/recipeController");

const {
  createUser,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
  loginUser,
} = require("../controller/userController");

const  { 
  createTransaction, getTransaction,getTransactions,updateTransaction, deleteTransaction  
} = require('../controller/transactionController')

//recipe

router.post("/createRecipe", createRecipe);

router.get("/getRecipes", getRecipes);

router.get("/getRecipeById/:id", getRecipeById);

router.put("/updateRecipe/:id", updateRecipe);

router.delete("/deleteRecipe/:id", deleteRecipe);

//user

router.post("/register", createUser);

router.get("/users", getUsers);

router.get("/users/:id", getUser);

router.put("/users/:id", updateUser);

router.delete("/users/:id", deleteUser);

router.post("/login", loginUser);

//transaction

router.post('/transactions', createTransaction);

router.get('/transactions', getTransactions);

router.get('/transactions/:id', getTransaction);

router.put('/transactions/:id', updateTransaction);

router.delete('/transactions/:id',deleteTransaction);

module.exports = router;
