import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class RecipeList extends React.Component {
  render() {
    return (
      <Link to={`/recipe-detail-page/${this.props.recipe.recipeId}`}>
        <div className="recipe" >
          <img src={this.props.recipe.image} alt={this.props.recipe.name} className="image clickable" />
          <h5 className="recipeName"><i className="fas fa-star"></i>{this.props.recipe.recipeName}</h5>
        </div>
      </Link>
    );
  }
}
export default withRouter(RecipeList);
