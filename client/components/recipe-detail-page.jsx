import React from 'react';

export default class RecipeDetailPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
  }

  getRecipe(){
    // fetch(`/recipe-detail-page/:recipeId`)
    //   .then(response=> response.json())
    //   .then(recipe => console.log(recipe))
  }

  render() {
    console.log('hello')
    return (
      <h1>ligma</h1>
    );
  }
}
