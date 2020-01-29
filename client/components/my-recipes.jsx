import React from 'react';
import TopBar from './top-bar';
import { Link } from 'react-router-dom';
import NavBar from './nav-bar';
import Swal from 'sweetalert2';

export default class MyRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favoriteRecipes: []
    };
    this.addToMealPlan = this.addToMealPlan.bind(this);
    this.deleteFavRecipes = this.deleteFavRecipes.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    const init = {
      method: 'GET'

    };
    fetch('/api/fav', init)
      .then(response => response.json())
      .then(data => {
        this.setState(state => ({ favoriteRecipes: data }));
      });
  }

  deleteFavRecipes(recipeId) {
    const init = {
      method: 'DELETE'
    };
    fetch(`/api/myrecipes/${recipeId}`, init)
      .then(() => {
        const newFavRecipes = [...this.state.favoriteRecipes];
        newFavRecipes.forEach((recipe, index) => {
          if (recipe.recipeId === recipeId) {
            newFavRecipes.splice(index, 1);
          }
        });
        Swal.fire('Successfully removed from your favorite recipes!');
        this.setState({ favoriteRecipes: newFavRecipes });
      });

  }

  addToMealPlan(recipeId) {
    const userId = 4;
    const reqBody = { recipeId, userId };
    const init = {
      method: 'POST',
      body: JSON.stringify(reqBody),
      headers: { 'Content-type': 'application/json' }
    };
    fetch('api/mealplan', init)
      .then(response => response.json())
      .then(result => {
        if (!result.error) {
          Swal.fire('Added to meal plan!');
        } else {
          Swal.fire(result.error);
        }
      });
  }

  render() {
    const data = this.state.favoriteRecipes;
    const display = data.map(element => (<FavRecipe key={element.recipeId} recipe={element} delete={this.deleteFavRecipes} addToMealPlan={this.addToMealPlan}/>));
    return (
      <React.Fragment>
        <TopBar displayIcon={true} title={'My Recipes'}/>
        <div className="recipes-container">
          {display}
        </div>
        <NavBar />
      </React.Fragment>
    );
  }
}

function FavRecipe(props) {
  return (
    <div className="card fadeIn">
      <button type="button" className="close" onClick={() => { props.delete(props.recipe.recipeId); }}aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
      <div className="card-body row">
        <div className="col-6">
          <Link to={`/recipe-detail-page/${props.recipe.recipeId}`}>
            <h5 className="card-title text-primary">{props.recipe.recipeName}</h5>
          </Link>
          <div className="card-text">
            <div className="category-serving">
              <p>Category: {props.recipe.category}</p>
              <p>Serving: {props.recipe.numberOfServings}</p>
            </div>
            <div className="button-container">
              <i className="fas fa-plus mr-3" onClick={() => { props.addToMealPlan(props.recipe.recipeId); }}></i>
              <i className="fas fa-share"></i>
            </div>
          </div>
        </div>
        <img className="picture col-6" src={props.recipe.image} />
      </div>
    </div >
  );
}
