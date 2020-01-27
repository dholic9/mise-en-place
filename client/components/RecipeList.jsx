import React from 'react';
import { Link } from 'react-router-dom';

function renderListItem(recipe, index) {
  return (
    <Link to={`/recipe-detail-page/${recipe.recipeId}`} key={index}>
      <div className=" recipe" >
        <img src={recipe.image} alt={recipe.name} className="image clickable" />
        <h5 className="recipeName">{recipe.recipeName}</h5>
      </div>
    </Link>
  );
}

function RecipeList({ recipes }) {
  return (
    <div className="my-recipe">
      {recipes.map(renderListItem)}
    </div>
  );
}

export default RecipeList;
