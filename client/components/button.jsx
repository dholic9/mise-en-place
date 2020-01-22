import React from 'react';
import AppContext from '../lib/context';

export default class Button extends React.Component {
  render() {
    return (
      <button
        onClick={() => {
          this.context.handleClick();
        }}
      >
      Clicked Me
      </button>
    );
  }
}

Button.contextType = AppContext;
