import React from 'react';
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom';
import Button from './button';
import AppContext from '../lib/context';
import Login from './login';
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
  }

  render() {
    const context = {
      user: this.state.user,
      handleClick: this.handleClick,
      handleUserLogin: this.handleUserLogin
    };
    return (
      <AppContext.Provider value={context}>
        <Router
          forceRefresh={true}
        >
          <Route exact path="/login" component={Login}/>
          <Route exact path="/public-page" component={PublicPage}/>
          <Route exact path="/recipe-detail-page/:recipeId" component={RecipeDetailPage}/>
        </Router>
      </AppContext.Provider>
    );
  }
}
