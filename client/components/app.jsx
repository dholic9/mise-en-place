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
import MealPlan from './meal-plan-page';
import ShoppingList from './shopping-list';
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
    return (fetch('api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        console.log('data', data);
        if (typeof data !== 'number') {
          return console.log('error');
        }
        this.setState({ user: data });
      }));

  }

  handleUserSignup(user) {
    console.log('sign up user: ', user);
    return fetch('api/users/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(res => res.ok ? res.json() : Promise.reject(new Error('Failed to Create User')))
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
    return (
      <AppContext.Provider value={context}>
        <Router >
          <Route exact path='/'>
            <Redirect to='/login'/>
          </Route>
          <Route exact path="/myRecipes" component={MyRecipes}/>
          <Route exact path="/shoppingList" component={ShoppingList}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/mealplan" component={MealPlan} />
          <Route exact path="/sign-up" component={SignUp}/>
          <Route exact path="/public-page" component={PublicPage}/>
          <Route path="/recipe-detail-page/:recipeId" component={RecipeDetailPage}/>
        </Router>
      </AppContext.Provider>
    );
  }
}
