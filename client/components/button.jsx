import React from 'react';
import AppContext from '../lib/context';

export default class Button extends React.Component {
  render() {
    return (
      <div className="row">
        <button
          onClick={() => {
            this.context.handleClick();
          }}
        >
        Clicked Me
        </button>
      </div>
    );
  }
}

Button.contextType = AppContext;
