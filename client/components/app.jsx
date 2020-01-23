import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AppContext from '../lib/context';
import MyRecipes from './my-recipes';
import Login from './login';

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
        <Router forceRefresh={true}>
          <Route exact path="/myrecipes" component={MyRecipes}/>
          <Route exact path="/login" component={Login}/>
        </Router>
      </AppContext.Provider>
    );
  }
}
