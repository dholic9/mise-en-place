import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AppContext from '../lib/context';
import TopBar from './top-bar';
import MyRecipes from './my-recipes';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isLoading: true,
      isButtonClicked: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(state => ({ isButtonClicked: !state.isButtonClicked }));
  }

  render() {
    const context = {

    };
    return (
      <AppContext.Provider value={context}>
        <Router>
          <TopBar/>

          <Route exact path="/myRecipes" component={MyRecipes}/>
        </Router>
      </AppContext.Provider>
    );
  }
}
