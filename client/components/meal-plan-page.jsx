import React from 'react';
import TopBar from './top-bar';
import { Link } from 'react-router-dom';
import NavBar from './nav-bar';
export default class MealPlan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mealPlan: []
    };
  }

  componentDidMount() {
    this.getMealPlan();
  }

  getMealPlan() {
    const init = {
      method: 'GET'
    };
    fetch('/api/mealplan', init)
      .then(response => response.json())
      .then(data => {
        this.setState(state => ({ mealPlan: data }));
      });
  }

  render() {
    const data = this.state.mealPlan;
    const display = data.map(element =>
      (<MealPlanRecipe
        key={element.recipeId}
        recipe={element}
      />));
    return (
      <React.Fragment>
        <TopBar mealPlanIcon={true} addRecipeIcon={false} title={'Meal Plan'}/>
        <div className="recipes-container fadeIn">
          {display}
        </div>
        <NavBar/>
      </React.Fragment>
    );
  }
}

function MealPlanRecipe(props) {
  return (
    <Link to={`/recipe-detail-page/${props.recipe.recipeId}`}>
      <div className="card">
        <div className="card-body row">
          <div className="col-6">
            <h5 className="card-title">{props.recipe.recipeName}</h5>
            <div className="card-text">
              <div className="category-serving">
                <p>Category: {props.recipe.category}</p>
                <p>Serving: {props.recipe.numberOfServings}</p>
              </div>
            </div>
          </div>
          <img className="picture col-6" src={props.recipe.image} />
        </div>
      </div >
    </Link>
  );
}
