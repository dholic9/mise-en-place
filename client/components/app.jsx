import React from 'react';
import Button from './button';
import AppContext from '../lib/context';

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
        <div>{color}</div>
        <Button />
      </AppContext.Provider>
    );
  }
}
