import React from 'react';
// import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom';
// import Button from './button';
// import AppContext from '../lib/context';
// import IntroPage from './intro-page';
import PublicPage from './public-page';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isLoading: true,
      isButtonClicked: false
    };
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <PublicPage />
        </div>
      </div>
    );
  }
}
