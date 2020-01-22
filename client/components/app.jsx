import React from 'react';
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom';
import Button from './button';
import AppContext from '../lib/context';
import IntroPage from './intro-page';

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
      handleClick: this.handleClick
    };

    let color;
    if (this.state.isButtonClicked) {
      color = 'red';
    } else {
      color = 'green';
    }
    return (
      <AppContext.Provider value={context}>
        <Router>
          <div className="container">
            <div>{color}
              <Button></Button>
            </div>
            <Route exact path="/intro" component={IntroPage}/>
          </div>

        </Router>
      </AppContext.Provider>
    );
  }
}
