import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { useRecipeDispatch } from "../../services/context/RecipeContext";
import {
  GET_RECIPE,
  DELETE_RECIPE,
} from "../../services/graphql/RecipeGraphql";
import { Grid, Typography, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import "../RecipeDetails/RecipeDetails.css";

const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, loading, error } = useQuery(GET_RECIPE, {
    variables: { id },
  });
  
  const [deleteRecipe] = useMutation(DELETE_RECIPE);
  const dispatch = useRecipeDispatch();

  const handleDelete = async () => {
    try {
      await deleteRecipe({ variables: { id } });
      dispatch({ type: "DELETE_RECIPE", payload: id });
      navigate("/dashboard");
    } catch (error) {
      console.error("Failed to delete recipe:", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const recipe = data ? data.getRecipe : null;

  if (!recipe) {
    return <p>Recipe not found.</p>;
  }

  return (
    <div className="recipe-details-container">
      <div className="header">
        <Typography variant="h4">Recipe Manager</Typography>
        <Link to="/dashboard" className="back-button">
          Back to List
        </Link>
      </div>
      <div className="recipe-details-content">
        <img
          src={recipe.imageURL || "/default-image.jpg"}
          alt={recipe.title}
          className="recipe-image"
        />
        <div className="recipe-details">
          <Typography variant="h5" gutterBottom>
            Recipe Details
          </Typography>
          <div className="recipe-detail-item">
            <Typography variant="subtitle1">
              <strong>Title:</strong> {recipe.title}
            </Typography>
          </div>
          <div className="recipe-detail-item">
            <Typography variant="subtitle1">
              <strong>Category:</strong> {recipe.category}
            </Typography>
          </div>
          <div className="recipe-detail-item">
            <Typography variant="subtitle1">
              <strong>Ingredients:</strong>
            </Typography>
            <ul>
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>
          <div className="recipe-detail-item">
            <Typography variant="subtitle1">
              <strong>Instructions:</strong>
            </Typography>
            <ol>
              {recipe.instructions
                .split(".")
                .map((step, index) =>
                  step.trim() ? <li key={index}>{step.trim()}</li> : null
                )}
            </ol>
          </div>
          <div className="recipe-detail-item">
            <Typography variant="subtitle1">
              <strong>Date:</strong>{" "}
              {new Date(recipe.date).toLocaleDateString()}
            </Typography>
          </div>
          <div className="recipe-actions">
            <Link to={`/edit-recipe/${recipe.id}`} className="action-button">
              <IconButton color="primary">
                <EditIcon />
              </IconButton>
            </Link>
            <IconButton onClick={handleDelete} color="error">
              <DeleteIcon />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
