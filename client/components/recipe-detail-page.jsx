import React from 'react';

class RecipeDetailPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: []
    };
  }

  componentDidMount(){
    this.getRecipe()
  }

  getRecipe(){
    fetch(`/api/recipe-detail-page/${this.props.match.params.recipeId}`)
      .then(response => response.json())
      .then(recipe=>this.setState({recipe}))
      .catch(err => console.error(err));
  }

  render() {
    return  (
      <div className="recipeInfo">
        <div className="category">some stuff</div>
      </div>
    )
  }
}

export default RecipeDetailPage