import React from 'react';
import IngredientListItem from './ingredient-list-item'

class RecipeDetailPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: []
    };
  }

  componentDidMount() {
    this.getRecipe();
  }

  getRecipe() {
    fetch(`/api/recipe-detail-page/${this.props.match.params.recipeId}`)
      .then(response => response.json())
      .then(recipe => this.setState({ recipe }))
      .catch(err => console.error(err));
  }

  generateIngredients() {
    let count = 0
    if (this.state.recipe.ingredients) {
      const ingredientList = this.state.recipe.ingredients.map(ing => {
        count++
        return <IngredientListItem count={count} ing={ing} key={ing.ingredientId}/>
      })
      return ingredientList
    }
  }

  render() {
    const recipe = this.state.recipe;
    return (
      <div className="recipeContainer">
        <div className="recipeInfo">
          <div className="category">Category: {recipe.category}</div>
          <div className="servings">Servings: {recipe.numberOfServings}</div>
        </div>
        <img src={recipe.image} alt={recipe.recipeName} className="image" />
        <div className="ingredientList">
          Ingredients
          {this.generateIngredients()}
        </div>
      </div>
    );
  }
}

export default RecipeDetailPage;
