import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class RecipeList extends React.Component {
  render() {
    console.log(this.props)

    return (
      <Link to={`/recipe-detail-page/${this.props.recipe.recipeId}`}>
        <div className="recipe" >
          <img src={this.props.recipe.image} alt={this.props.recipe.name} className="image" />
          <h5 className="recipe-info"><i className="fas fa-star"></i>{this.props.recipe.recipeName}</h5>
        </div>
      </Link>
    );
  }
}
export default withRouter(RecipeList)