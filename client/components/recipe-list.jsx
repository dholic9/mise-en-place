import React from 'react';
import { Link } from 'react-router-dom';

function renderListItem(recipe, index) {
  const image = recipe.image ? recipe.image : '/images/new-logo.png';
  return (
    <Link to={`/recipe-detail-page/${recipe.recipeId}`} key={index}>
      <div className=" recipe" >
        <img src={image} alt={recipe.name} className="image clickable" />
        <h4 className="recipeName outline">{recipe.recipeName}</h4>
      </div>
    </Link>
  );
}

function RecipeList({ recipes }) {
  recipes = recipes.sort(() => Math.random() - 0.5);
  return (
    <div className="my-recipe">
      {recipes.map(renderListItem)}
    </div>
  );
}

export default RecipeList;
