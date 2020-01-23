import React from 'react';

class PublicPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: []
    };
  }

  componentDidMount() {
    this.getRecipes();
  }

  getRecipes() {
    fetch('/api/recipes')
      .then(response => response.json())
      .then(recipes => this.setState({ recipes }))
      .catch(err => console.error(err));
  }

  generateRecipes() {
    if (this.state.recipes.length > 0) {
      const recipeArr = this.state.recipes.map(index => {
        return <RecipeList recipe={index} key={index.recipeId} />;
      });
      return recipeArr;
    }
  }

  render() {
    return (
      <div className="MyRecipe">
        {this.generateRecipes()}
      </div>
    );
  }
}

class RecipeList extends React.Component {
  render() {
    return (
      <div className="recipe" >
        <img src={this.props.recipe.image} alt={this.props.recipe.name} className="image"/>
        <h5 className="recipeInfo"><i className="fas fa-star"></i>{this.props.recipe.recipeName}</h5>
      </div>
    );
  }
}

export default PublicPage;
