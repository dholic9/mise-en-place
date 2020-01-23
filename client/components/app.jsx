import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from 'react-router-dom';
import MyRecipes from './my-recipes';
import Login from './login';
import AppContext from '../lib/context';
import PublicPage from './public-page';
import RecipeDetailPage from './recipe-detail-page';
import SignUp from './sign-up-page';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      isButtonClicked: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleUserLogin = this.handleUserLogin.bind(this);
    this.handleUserSignup = this.handleUserSignup.bind(this);
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
        if (typeof data !== 'number') {
          return console.log('error');
        }
        this.setState({ user: data });
      })
      .catch(err => console.error(err));
  }

  handleUserSignup(user) {
    console.log('sign up user: ', user);
    fetch('api/users/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        console.log('data returned:', data);
      });

  }

  componentDidMount() {

  }

  render() {

    const context = {
      user: this.state.user,
      handleClick: this.handleClick,
      handleUserLogin: this.handleUserLogin,
      handleUserSignup: this.handleUserSignup
    };
    console.log('context', context);
    return (
      <AppContext.Provider value={context}>
        <Router forceRefresh={true}>
          <Route exact path="/myRecipes" component={MyRecipes}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/sign-up" component={SignUp}/>
          <Route exact path="/public-page" component={PublicPage}/>
          <Route exact path="/recipe-detail-page/:recipeId" component={RecipeDetailPage}/>

        </Router>
      </AppContext.Provider>
    );
  }
}
