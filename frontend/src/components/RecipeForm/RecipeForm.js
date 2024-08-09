import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useParams, useNavigate } from "react-router-dom";
import "../RecipeForm/RecipeForm.css";
import {
  GET_RECIPE,
  EDIT_RECIPE,
  ADD_RECIPE,
  GET_RECIPES,
} from "../../services/graphql/RecipeGraphql";

const RecipeForm = () => {
  const { id: recipeId } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [existingImageURL, setExistingImageURL] = useState("");
  const [errors, setErrors] = useState({});

  const { data, loading, error } = useQuery(GET_RECIPE, {
    skip: !recipeId,
    variables: { id: recipeId },
    onCompleted: (data) => {
      if (data.getRecipe) {
        setTitle(data.getRecipe.title);
        setCategory(data.getRecipe.category);
        setIngredients(data.getRecipe.ingredients || "");
        setInstructions(data.getRecipe.instructions);
        setExistingImageURL(data.getRecipe.imageURL || "");
      }
    },
  });

  const [addRecipe] = useMutation(ADD_RECIPE);
  const [editRecipe] = useMutation(EDIT_RECIPE);

  const validateForm = () => {
    const newErrors = {};
    if (!title) newErrors.title = "Title is required";
    if (!category) newErrors.category = "Category is required";
    if (!ingredients) newErrors.ingredients = "Ingredients are required";
    if (!instructions) newErrors.instructions = "Instructions are required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("http://localhost:4000/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.imageURL;
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleSave = async () => {
    if (!validateForm()) return;
  
    try {
      let imageURL = existingImageURL;
      if (selectedImage) {
        imageURL = await uploadImage(selectedImage);
      }
  
      const ingredientsArray = typeof ingredients === 'string'
        ? ingredients.split('\n').filter(Boolean) 
        : ingredients; 
  
      if (recipeId) {
        await editRecipe({
          variables: {
            id: recipeId,
            title,
            category,
            ingredients: ingredientsArray,
            instructions,
            imageURL,
          },
          refetchQueries: [{ query: GET_RECIPES }],
        });
      } else {
        await addRecipe({
          variables: {
            title,
            category,
            ingredients: ingredientsArray,
            instructions,
            imageURL,
          },
          refetchQueries: [{ query: GET_RECIPES }],
        });
      }
      navigate("/recipes");
    } catch (err) {
      console.error("Error saving recipe:", err);
    }
  };
  
  
  
   
  const handleCancel = () => {
    navigate("/recipes");
  };

  // Handle loading and error states
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading recipe data.</p>;

  return (
    <div className="recipe-form-container">
      <div className="header">
        <h1>{recipeId ? "Edit Recipe" : "Add Recipe"}</h1>
      </div>
      <div className="recipe-form">
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {errors.title && <p className="error-message">{errors.title}</p>}
        </label>
        <label>
          Category:
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          {errors.category && (
            <p className="error-message">{errors.category}</p>
          )}
        </label>
        <label>
          Ingredients:
          <textarea
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
          />
          {errors.ingredients && (
            <p className="error-message">{errors.ingredients}</p>
          )}
        </label>
        <label>
          Instructions:
          <textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
          />
          {errors.instructions && (
            <p className="error-message">{errors.instructions}</p>
          )}
        </label>
        <label>
          Image:
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setSelectedImage(e.target.files[0])}
          />
          {existingImageURL && !selectedImage && (
            <div className="image-preview">
              <img src={existingImageURL} alt="Existing Recipe" />
            </div>
          )}
        </label>
        <div className="form-actions">
          <button onClick={handleSave}>{recipeId ? "Edit" : "Save"}</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default RecipeForm;
