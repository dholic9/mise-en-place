import React from 'react';
import TopBar from './top-bar';
import { Link } from 'react-router-dom';
import NavBar from './nav-bar';

export default class MyRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favoriteRecipes: []
    };
    this.addToMealPlan = this.addToMealPlan.bind(this);
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
          window.alert('added to meal plan');
        } else {
          window.alert(result.error);
        }
      });
  }

  render() {
    const data = this.state.favoriteRecipes;
    const display = data.map(element => (<FavRecipe key={element.recipeId} recipe={element} addToMealPlan={this.addToMealPlan}/>));
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
  return (
    <div className="card ">
      <div className="card-body row">
        <div className="col-6">
          <Link to={`/recipe-detail-page/${props.recipe.recipeId}`}>
            <h5 className="card-title">{props.recipe.recipeName}</h5>
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
