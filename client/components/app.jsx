import React from 'react';
import Button from './button';
import AppContext from '../lib/context';
import PublicPage from './public-page';
import RecipeDetailPage from './recipe-detail-page';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isButtonClicked: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleUserLogin = this.handleUserLogin.bind(this);
  }

  handleClick() {
    this.setState(state => ({ isButtonClicked: !state.isButtonClicked }));
  }

  handleUserLogin(user) {
    console.log('user passed in: ', user);
    fetch('api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        console.log('data', data);
      });

  }

  render() {
    console.log(history);
    const context = {
      user: this.state.user,
      handleClick: this.handleClick,
      handleUserLogin: this.handleUserLogin
    };
    return (
      <AppContext.Provider value={context}>
        <Router forceRefresh={true}>
          <TopBar/>
          <Route exact path="/myRecipes" component={MyRecipes}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/public-page" component={PublicPage}/>
          <Route exact path="/recipe-detail-page/:recipeId" component={RecipeDetailPage}/>
        </Router>
      </AppContext.Provider>
    );
  }
}
