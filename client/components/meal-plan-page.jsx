import React from 'react';
import TopBar from './top-bar';

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
    const display = data.map(element => (<MealPlanRecipe key={element.recipeId} recipe={element}/>));
    return (
      <React.Fragment>
        <TopBar displayIcon={false} title={'Meal Plan'}/>
        <div className="recipes-container">
          {display}
        </div>
      </React.Fragment>
    );
  }
}

function MealPlanRecipe(props) {
  return (
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
  );
}
