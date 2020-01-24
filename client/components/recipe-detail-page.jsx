import React from 'react';
import IngredientListItem from './ingredient-list-item';
import InstructionListItem from './instruction-list-item';
import TopBar from './top-bar';

class RecipeDetailPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: {}
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
    let count = 0;
    if (this.state.recipe.ingredients) {
      const ingredientList = this.state.recipe.ingredients.map(ing => {
        count++;
        return <IngredientListItem count={count} ing={ing} key={ing.ingredientId}/>;
      });
      return ingredientList;
    }
  }

  generateInstructions() {
    let count = 0;
    if (this.state.recipe.instructions) {
      const ingredientList = this.state.recipe.instructions.map(ins => {
        count++;
        return <InstructionListItem count={count} ins={ins} key={ins.instructionOrder}/>;
      });
      return ingredientList;
    }
  }

  render() {
    const recipe = this.state.recipe;
    return (
      <div className="recipeContainer">
        <TopBar displayIcon={true} title={this.state.recipe.recipeName}/>
        <div className="recipeInfo text-center">
          <div className="category">Category: {recipe.category}</div>
          <div className="servings">Servings: {recipe.numberOfServings}</div>
        </div>
        <img src={recipe.image} alt={recipe.recipeName} className="image" />
        <div className="ingredientList">
          <div className="text-center border-bottom border-dark m-0">Ingredients</div>
          {this.generateIngredients()}
        </div>
        <div className="instructionList">
          <div className="text-center border-bottom border-dark m-0">Instructions</div>
          {this.generateInstructions()}
        </div>
      </div>
    );
  }
}

export default RecipeDetailPage;
