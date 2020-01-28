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
    this.deleteMealPlan = this.deleteMealPlan.bind(this);
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

  deleteMealPlan(recipeId) {
    const init = {
      method: 'DELETE',
      body: {
        recipeId: JSON.stringify(recipeId)
      }
    };
    fetch(`/api/mealplan/${recipeId}`, init)
      .then(response => response.json())
      .then(data => {
        const tempState = [...this.state.mealPlan];
        for (let i = 0; i < tempState.length; i++) {
          if (tempState[i].recipeId === recipeId) {
            tempState.splice(i, 1);
          }
        }
        this.setState({ mealPlan: tempState });
      });
  }

  render() {
    const data = this.state.mealPlan;
    const display = data.map(element =>
      (<MealPlanRecipe
        key={element.recipeId}
        recipe={element}
        delete={this.deleteMealPlan}
      />));
    return (
      <React.Fragment>
        <TopBar displayIcon={true} title={'Meal Plan'}/>
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

    <div className="card">
      <button type="button" onClick={() => { props.delete(props.recipe.recipeId); }} className="close" aria-label="Close">
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
          </div>
        </div>
        <img className="picture col-6" src={props.recipe.image} />
      </div>
    </div >

  );
}
