import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Link, Switch, withRouter, useHistory } from 'react-router-dom';
import Button from './button';
import AppContext from '../lib/context';
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
        <Router
          forceRefresh={false}
        >
          <Route exact path="/login" component={Login}/>
        </Router>
      </AppContext.Provider>
    );
  }
}
