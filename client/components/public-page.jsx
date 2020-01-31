import React from 'react';
import TopBar from './top-bar';
import RecipeList from './recipe-list';
import NavBar from './nav-bar';

class PublicPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: []
    };
  }

  componentDidMount() {
    this.getRecipes();
  }

  getRecipes() {
    fetch('/api/recipes')
      .then(response => response.json())
      .then(recipes => this.setState({ recipes }))
      .catch(err => console.error(err));
  }

  render() {
    return (
      <React.Fragment>
        <div className="container-fluid w-100 p-0 fadeIn">
          <div className="row w-100">
            <TopBar title={'Featured'} mealPlanIcon={true} addRecipeIcon={true}/>
          </div>
          <div className="row longFadeIn text-center featured">
            <RecipeList recipes={this.state.recipes}/>
          </div>
          <div className="row">
            <NavBar/>
          </div>

        </div>

      </React.Fragment>

    );
  }
}

export default PublicPage;
