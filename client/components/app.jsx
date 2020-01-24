import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  Redirect
} from 'react-router-dom';
import MyRecipes from './my-recipes';
import MealPlan from './meal-plan-page';
import Login from './login';
import AppContext from '../lib/context';
import PublicPage from './public-page';
import RecipeDetailPage from './recipe-detail-page';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: null,
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
        this.setState({ userId: data });
      })
      .catch(err => console.error(err));
  }

  componentDidMount() {

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
          <Route exact path="/mealplan" component={MealPlan} />
          <Route exact path="/myrecipes" component={MyRecipes}/>
          <Route exact path="/login" >
            {this.state.userId ? <Redirect to="/public-page" /> : <Login/>}
          </Route>
          <Route exact path="/public-page" component={PublicPage}/>
          <Route exact path="/recipe-detail-page/:recipeId" component={RecipeDetailPage}/>
        </Router>
      </AppContext.Provider>
    );
  }
}
