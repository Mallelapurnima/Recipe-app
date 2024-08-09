import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import {
  useRecipeState,
  useRecipeDispatch,
} from "../../services/context/RecipeContext.js";
import {
  GET_RECIPES,
  GET_RECIPES_COUNT,
  DELETE_RECIPE,
  ADD_RECIPE
} from "../../services/graphql/RecipeGraphql.js";
import "../Dashboard/Dashboard.css";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import "../ConfirmModal/ConfirmModal.css";
import logo from "../../assests/images/logo.png";
import headerImage from "../../assests/images/headerImage.jpg";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Dashboard = () => {
  const { recipes } = useRecipeState();
  const dispatch = useRecipeDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [recipeToDelete, setRecipeToDelete] = useState(null);

  const {
    data: recipesData,
    loading: recipesLoading,
    error: recipesError,
  } = useQuery(GET_RECIPES);
  const {
    data: countData,
    loading: countLoading,
    error: countError,
  } = useQuery(GET_RECIPES_COUNT);
  
  const [deleteRecipe] = useMutation(DELETE_RECIPE, {
    onError: (error) => {
      console.error("Mutation error:", error.message);
    },
    onCompleted: () => {
      setIsModalOpen(false);
    },
  });

  // Handle recipes data and dispatch to context
  useEffect(() => {
    if (recipesData && recipesData.getRecipes) {
      dispatch({ type: "SET_RECIPES", payload: recipesData.getRecipes });
    }
  }, [recipesData, dispatch]);

  // Filter recipes based on search and category
  const filteredRecipes = recipes ? recipes.filter((recipe) => {
    const matchesSearch = recipe.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || recipe.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }) : [];

  const handleDelete = async () => {
    if (recipeToDelete) {
      try {
        const { data } = await deleteRecipe({
          variables: { id: recipeToDelete },
        });
        if (data && data.deleteRecipe) {
          dispatch({ type: "DELETE_RECIPE", payload: recipeToDelete });
          } else {
          console.error("Delete operation did not return expected data.");
        }
      } catch (error) {
        console.error("Failed to delete recipe:", error.message);
      }
    }
  };

  const openDeleteModal = (id) => {
    setRecipeToDelete(id);
    setIsModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsModalOpen(false);
    setRecipeToDelete(null);
  };

  if (recipesLoading || countLoading) return <p>Loading...</p>;
  if (recipesError) return <p>Error: {recipesError.message}</p>;
  if (countError) return <p>Error: {countError.message}</p>;

  const recipeCount = countData ? countData.getRecipesCount : 0;

  return (
    <div className="dashboard-container">
      <div
        className="dashboard-header"
        style={{
          backgroundImage: `url(${headerImage})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="header-container">
          <div className="header-top-items">
            <img className="logo-img" src={logo} alt="Logo" />
            <div className="search-container">
              <input
                type="text"
                placeholder="Search Recipes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              <i className="fas fa-search search-icon"></i>
            </div>
            <div className="header-actions">
              <Link to="/add-recipe" className="action-button">
                Add New Recipe
              </Link>
              <button
                className="action-button logout-button"
                onClick={() => (window.location.href = "/login")}
              >
                Logout
              </button>
            </div>
          </div>
          <div className="header-title">
            <h1 >Explore Recipes</h1>
          </div>
        </div>
      </div>
      <div className="dashboard-content">
        <div className="dashboard-content-container">
        <div className="filter-category">
          <h2 className="recipe-list-heading">Recipe List ({recipeCount})</h2>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
            <option value="Dessert">Dessert</option>
          </select>
        </div>
        <div className="recipe-list">
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map((recipe) => (
              <div key={recipe.id} className="recipe-card">
                <img
                  src={recipe.imageURL || "/default-image.jpg"}
                  alt={recipe.title}
                />
                <h3>{recipe.title}</h3>
                <p>Category: {recipe.category}</p>
                <div className="recipe-actions">
                  <Link to={`/recipes/${recipe.id}`} className="action-button">
                    View Details
                  </Link>
                  <Link
                    to={`/edit-recipe/${recipe.id}`}
                    className="action-button"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => openDeleteModal(recipe.id)}
                    className="action-button delete-button"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No recipes found.</p>
          )}
        </div>
        </div>
      </div>
      <ConfirmModal
        isOpen={isModalOpen}
        onConfirm={handleDelete}
        onCancel={closeDeleteModal}
        message="Are you sure you want to delete this recipe?"
      />
    </div>
  );
};

export default Dashboard;
