import React from 'react';
export default class MyRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favoriteRecipes: []
    };
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

  render() {
    const data = this.state.favoriteRecipes;
    const display = data.map(element => (<FavRecipe key={element.recipeId} recipe={element}/>));
    return (
      <div className="recipes-container">
        {display}
      </div>
    );
  }
}

function FavRecipe(props) {
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
            <div className="button-container">
              <i className="fas fa-plus mr-3"></i>
              <i className="fas fa-share"></i>
            </div>
          </div>
        </div>
        <img className="picture col-6" src={props.recipe.image} />
      </div>
    </div >
  );
}
