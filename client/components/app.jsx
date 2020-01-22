import React from 'react';
<<<<<<< HEAD
=======
import Button from './button';
>>>>>>> 794fd600c484cf048444ea87ac4ebdaac5a32c16
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
<<<<<<< HEAD
    return (

    )
=======
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
>>>>>>> 794fd600c484cf048444ea87ac4ebdaac5a32c16
  }
}
