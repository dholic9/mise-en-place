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
    fetch('api/fav', init)
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
        <div className="container-fluid mb-4 pb-4 p-0 w-100 fadeIn">
          <TopBar mealPlanIcon={true} addRecipeIcon={true} title={'My Recipes'}/>
          <div className="recipes-container">
            {display}
          </div>
          <NavBar />
        </div>
      </React.Fragment>
    );
  }
}

function FavRecipe(props) {
  const image = props.recipe.image ? props.recipe.image : '/images/new-logo.png';
  return (
    <div className="card fadeIn">
      <img className="delete-button" src="https://img.icons8.com/ios-filled/100/000000/delete-forever.png" onClick={() => { props.delete(props.recipe.recipeId); }}/>
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
              <img className="add-meal-plan" src="https://img.icons8.com/ios-filled/40/000000/meal.png" onClick={() => { props.addToMealPlan(props.recipe.recipeId); }}/>
            </div>
          </div>
        </div>
        <img className="picture col-6" src={image} />
      </div>
    </div >
  );
}
