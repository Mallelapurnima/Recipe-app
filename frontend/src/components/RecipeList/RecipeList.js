import React from "react";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { GET_RECIPES } from "../../services/graphql/RecipeGraphql";
import "../RecipeList/RecipeList.css";

const RecipeList = () => {
  const { data, loading, error } = useQuery(GET_RECIPES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading recipes.</p>;
  if (!data || !data.getRecipes) return <p>No recipes available.</p>;

  return (
    <div className="recipe-list-container">
      <h1>Recipe List</h1>
      <div className="recipe-card-container">
        {data.recipes.map((recipe) => (
          <div key={recipe.id} className="recipe-card">
            <img
              src={recipe.imageURL}
              alt={recipe.title}
              className="recipe-image"
            />
            <div className="recipe-info">
              <h2>{recipe.title}</h2>
              <p>{recipe.category}</p>
              <Link
                to={`/recipe-details/${recipe.id}`}
                className="view-details-button"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeList;
