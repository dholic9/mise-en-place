import React from 'react';
import TopBar from './top-bar';
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
        window.alert('added to meal plan');
      })
      .catch(err => {
        window.alert(err.error);
      });
  }

  render() {
    const data = this.state.favoriteRecipes;
    const display = data.map(element => (<FavRecipe key={element.recipeId} recipe={element} addToMealPlan={this.addToMealPlan}/>));
    return (
      <div className="recipes-container">
        {display}
      </div>
    );
  }
}

function FavRecipe(props) {
  return (
    <React.Fragment>
      <TopBar/>
      <div className="card">
        <div className="card-body row">
          <div className="col-6">
            <h5 className="card-title">{props.recipe.recipeName}</h5>
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
    </React.Fragment>
  );
}
