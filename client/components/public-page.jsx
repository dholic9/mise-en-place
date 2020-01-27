import React from 'react';
import TopBar from './top-bar';
import RecipeList from './RecipeList';
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
      <div className="container-fluid w-100 p-0">
        <div className="row w-100">
          <TopBar title={'Featured'} displayIcon={true} />
        </div>
        <div className="row featured">
          <RecipeList recipes={this.state.recipes} />
        </div>
        <div className="row">
          <NavBar />
        </div>
      </div>
    );
  }
}

export default PublicPage;
